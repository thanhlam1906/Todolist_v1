import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@/lib/useTheme";

const CategoryPieChart = ({ data }) => {
  const { theme } = useTheme();
  
  if (!data || data.length === 0) {
    return (
      <Card className="col-span-1 border-0 bg-card/80 backdrop-blur-sm shadow-custom-md">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Phân bố danh mục
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <p className="text-sm text-muted-foreground">Chưa có dữ liệu</p>
        </CardContent>
      </Card>
    );
  }

  const isDark = theme === "dark";

  return (
    <Card className="col-span-1 border-0 bg-card/80 backdrop-blur-sm shadow-custom-md flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Phân bố danh mục
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  borderRadius: "8px",
                  color: isDark ? "#f8fafc" : "#0f172a",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ fontWeight: 500 }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value, entry) => (
                  <span style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
