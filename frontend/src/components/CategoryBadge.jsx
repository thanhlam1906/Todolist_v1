import React from "react";

const CategoryBadge = ({ category }) => {
  if (!category) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium transition-colors"
      style={{
        backgroundColor: `${category.color}18`,
        color: category.color,
        border: `1px solid ${category.color}30`,
      }}
    >
      <span
        className="size-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: category.color }}
      />
      {category.name}
    </span>
  );
};

export default CategoryBadge;
