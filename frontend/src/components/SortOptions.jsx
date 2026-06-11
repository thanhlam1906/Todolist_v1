import React from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpDown, Check } from "lucide-react";

const sortOptions = [
  { value: "createdAt-desc", label: "Mới nhất" },
  { value: "createdAt-asc", label: "Cũ nhất" },
  { value: "title-asc", label: "A → Z" },
  { value: "title-desc", label: "Z → A" },
  { value: "dueDate-asc", label: "Deadline gần nhất" },
  { value: "priority-desc", label: "Ưu tiên cao nhất" },
];

const SortOptions = ({ sortBy, sortOrder, onSortChange }) => {
  const [open, setOpen] = React.useState(false);
  const currentValue = `${sortBy}-${sortOrder}`;

  const currentLabel =
    sortOptions.find((o) => o.value === currentValue)?.label || "Sắp xếp";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
          <ArrowUpDown className="size-3.5" />
          {currentLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1" align="end">
        <div className="space-y-0.5">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between transition-colors ${
                currentValue === option.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              onClick={() => {
                const [field, order] = option.value.split("-");
                onSortChange(field, order);
                setOpen(false);
              }}
            >
              {option.label}
              {currentValue === option.value && (
                <Check className="size-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortOptions;
