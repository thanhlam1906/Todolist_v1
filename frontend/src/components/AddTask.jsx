import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "lucide-react";
import PrioritySelector from "./PrioritySelector";

const AddTask = ({ handleNewTaskAdded, categories = [] }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showOptions, setShowOptions] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const selectedCategory = categories.find((c) => c._id === selectedCategoryId);

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
          categoryId: selectedCategoryId,
          dueDate: dueDate || null,
          priority,
        });
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào.`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm task.", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.");
      }

      setNewTaskTitle("");
      setSelectedCategoryId(null);
      setDueDate("");
      setPriority("medium");
      setShowOptions(false);
    } else {
      toast.error("Bạn cần nhập nội dung của nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="space-y-3">
        {/* Main row */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="Cần phải làm gì?"
            className="h-12 text-base bg-slate-50 dark:bg-input sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          {/* Category Selector */}
          <Popover open={catOpen} onOpenChange={setCatOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 flex-shrink-0"
                title="Chọn danh mục"
              >
                {selectedCategory ? (
                  <span
                    className="size-4 rounded-full"
                    style={{ backgroundColor: selectedCategory.color }}
                  />
                ) : (
                  <Tag className="size-4 text-muted-foreground" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-1" align="end">
              <button
                className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${
                  !selectedCategoryId
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={() => {
                  setSelectedCategoryId(null);
                  setCatOpen(false);
                }}
              >
                Không có danh mục
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center gap-2 transition-colors ${
                    selectedCategoryId === cat._id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(cat._id);
                    setCatOpen(false);
                  }}
                >
                  <span
                    className="size-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Toggle options */}
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 flex-shrink-0"
            title="Thêm tuỳ chọn"
            onClick={() => setShowOptions(!showOptions)}
          >
            {showOptions ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </Button>

          <Button
            variant="gradient"
            size="xl"
            className="px-6"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="size-5" />
            Thêm
          </Button>
        </div>

        {/* Options row (collapsible) */}
        {showOptions && (
          <div className="flex flex-col gap-3 pt-2 border-t border-border/30 animate-in slide-in-from-top-2 duration-200">
            {/* Due Date */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-muted-foreground min-w-[70px]">
                Deadline:
              </label>
              <Input
                type="datetime-local"
                className="h-9 text-xs bg-slate-50 dark:bg-input border-border/50 flex-1"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Priority */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-muted-foreground min-w-[70px]">
                Ưu tiên:
              </label>
              <PrioritySelector value={priority} onChange={setPriority} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AddTask;
