import React from "react";
import { Button } from "./ui/button";
import { Tag, X } from "lucide-react";

const CategoryFilter = ({ categories = [], selectedCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag className="size-3.5 text-muted-foreground flex-shrink-0" />
      <Button
        variant={!selectedCategory ? "secondary" : "ghost"}
        size="sm"
        className="text-xs h-7 px-2.5"
        onClick={() => onSelect(null)}
      >
        Tất cả
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat._id}
          variant={selectedCategory === cat._id ? "secondary" : "ghost"}
          size="sm"
          className="text-xs h-7 px-2.5 gap-1.5"
          onClick={() => onSelect(cat._id)}
        >
          <span
            className="size-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: cat.color }}
          />
          {cat.name}
          {selectedCategory === cat._id && (
            <X
              className="size-3 ml-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(null);
              }}
            />
          )}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
