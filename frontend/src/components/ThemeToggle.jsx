import React from "react";
import { useTheme } from "@/lib/useTheme";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      id="theme-toggle"
      variant="ghost"
      size="icon"
      className="relative size-9 rounded-full overflow-hidden"
      onClick={toggleTheme}
      title={theme === "dark" ? "Chuyển sang sáng" : "Chuyển sang tối"}
    >
      <Sun
        className={`size-4 transition-all duration-300 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
        style={{ position: "absolute" }}
      />
      <Moon
        className={`size-4 transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
        style={{ position: "absolute" }}
      />
    </Button>
  );
};

export default ThemeToggle;
