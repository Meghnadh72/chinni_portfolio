"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "px-4 py-2 text-sm uppercase tracking-[0.15em] rounded-sm transition-all duration-300",
          activeCategory === "all"
            ? "bg-accent text-background"
            : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            "px-4 py-2 text-sm uppercase tracking-[0.15em] rounded-sm transition-all duration-300",
            activeCategory === cat
              ? "bg-accent text-background"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
