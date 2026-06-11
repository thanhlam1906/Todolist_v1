import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        id="search-tasks"
        type="text"
        placeholder="Tìm kiếm nhiệm vụ..."
        className="h-10 pl-9 pr-9 text-sm bg-card border-border/50 focus:border-primary/50 focus:ring-primary/20"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setQuery("")}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
