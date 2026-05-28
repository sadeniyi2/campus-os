"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AnnouncementFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

export function AnnouncementFilters({
  selectedCategory,
  onCategoryChange,
  search,
  onSearchChange,
}: AnnouncementFiltersProps) {
  return (
    <div className="space-y-3">
      <Input
        placeholder="Search announcements..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        startIcon={<Search className="size-4" />}
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("ALL")}
          className={cn(
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            selectedCategory === "ALL"
              ? "bg-primary text-primary-foreground border-transparent"
              : "bg-background hover:bg-accent border-border"
          )}
        >
          All
        </button>
        {ANNOUNCEMENT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              selectedCategory === cat.value
                ? "bg-primary text-primary-foreground border-transparent"
                : "bg-background hover:bg-accent border-border"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
