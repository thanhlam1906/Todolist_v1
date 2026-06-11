import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/useAuth";
import { toast } from "sonner";
import { UserPlus, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      toast.success("Đăng ký thành công! Chào mừng bạn 🎉");
      navigate("/");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Đã xảy ra lỗi. Thử lại sau.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background relative flex items-center justify-center p-4">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 70% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 30% 30%, rgba(255, 255, 153, 0.4), transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
            TodoX
          </h1>
          <p className="text-muted-foreground">
            Tạo tài khoản để bắt đầu quản lý nhiệm vụ
          </p>
        </div>

        {/* Form Card */}
        <Card className="p-8 border-0 bg-card/80 backdrop-blur-sm shadow-custom-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="h-12 pl-10 text-base bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 pl-10 text-base bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ít nhất 6 ký tự"
                  className="h-12 pl-10 pr-10 text-base bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="register-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="h-12 pl-10 text-base bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              id="register-submit"
              type="submit"
              variant="gradient"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="size-5" />
                  Đăng ký
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">hoặc</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login Link */}
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark transition-colors underline-offset-4 hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
