import React from "react";
import { cn } from "@/lib/utils";
import { priorityConfig } from "@/lib/data";

const PrioritySelector = ({ value = "medium", onChange }) => {
  return (
    <div className="flex gap-1.5">
      {Object.entries(priorityConfig).map(([key, config]) => (
        <button
          key={key}
          type="button"
          className={cn(
            "px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border",
            value === key
              ? "ring-2 ring-offset-1 scale-105"
              : "opacity-60 hover:opacity-100"
          )}
          style={{
            backgroundColor: value === key ? `${config.color}20` : "transparent",
            borderColor: `${config.color}40`,
            color: config.color,
            ringColor: config.color,
          }}
          onClick={() => onChange(key)}
          title={config.label}
        >
          {config.icon} {config.label}
        </button>
      ))}
    </div>
  );
};

export default PrioritySelector;
