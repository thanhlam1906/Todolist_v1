import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import { toast } from "sonner";
import StatsOverview from "@/components/charts/StatsOverview";
import CompletionChart from "@/components/charts/CompletionChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";

const DashboardPage = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const [overviewRes, weeklyRes, categoryRes] = await Promise.all([
        api.get("/stats/overview"),
        api.get("/stats/weekly"),
        api.get("/stats/categories"),
      ]);

      setOverviewData(overviewRes.data);
      setWeeklyData(weeklyRes.data);
      setCategoryData(categoryRes.data);
    } catch (error) {
      console.error("Lỗi khi tải thống kê:", error);
      toast.error("Không thể tải dữ liệu thống kê.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background relative pb-10">
      {/* Dreamy Sky Glow - similar to HomePage */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 70% 30%, rgba(173, 216, 230, 0.25), transparent 60%),
        radial-gradient(circle at 30% 70%, rgba(255, 255, 153, 0.3), transparent 60%)
        `,
        }}
      />
      
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-4xl p-6 mx-auto space-y-8">
          {/* Đầu Trang */}
          <Header />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground animate-pulse">Đang tải thống kê...</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Tổng quan */}
              <StatsOverview data={overviewData} />

              {/* Biểu đồ */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <CompletionChart data={weeklyData} />
                <CategoryPieChart data={categoryData} />
              </div>
            </div>
          )}

          {/* Chân Trang */}
          <div className="pt-8">
            <Footer
              activeTasksCount={overviewData?.activeTasks || 0}
              completedTasksCount={overviewData?.completeTasks || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
