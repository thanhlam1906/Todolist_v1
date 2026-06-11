import React from "react";
import { useAuth } from "@/lib/useAuth";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router";

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Lấy chữ cái đầu của tên user cho avatar
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="space-y-4">
      {/* Top bar: user info + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex items-center justify-center text-sm font-bold rounded-full size-9 bg-primary text-primary-foreground">
            {initial}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Navigation */}
          <Link to="/">
            <Button
              variant={location.pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              className="text-xs"
            >
              Nhiệm vụ
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
              size="sm"
              className="text-xs"
            >
              <LayoutDashboard className="size-3.5" />
              <span className="hidden sm:inline">Thống kê</span>
            </Button>
          </Link>

          <ThemeToggle />

          <Button
            id="logout-button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-muted-foreground hover:text-destructive"
            onClick={logout}
            title="Đăng xuất"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
          TodoX
        </h1>
        <p className="text-muted-foreground">
          Không có việc gì khó, chỉ sợ mình không làm 💪
        </p>
      </div>
    </div>
  );
};
