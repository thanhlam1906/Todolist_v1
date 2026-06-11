import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useTheme } from "@/lib/useTheme";

const CompletionChart = ({ data }) => {
  const { theme } = useTheme();
  
  if (!data || data.length === 0) return null;

  const isDark = theme === "dark";
  const primaryColor = isDark ? "#8b5cf6" : "#7c3aed"; // matches --primary
  const gridColor = isDark ? "#334155" : "#e2e8f0"; // slate-700 : slate-200
  const textColor = isDark ? "#94a3b8" : "#64748b"; // slate-400 : slate-500

  return (
    <Card className="col-span-1 lg:col-span-2 border-0 bg-card/80 backdrop-blur-sm shadow-custom-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Tiến độ hoàn thành (7 ngày qua)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={gridColor}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColor, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColor, fontSize: 12 }}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  borderRadius: "8px",
                  color: isDark ? "#f8fafc" : "#0f172a",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: primaryColor, fontWeight: 500 }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                name="Hoàn thành"
                stroke={primaryColor}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCompleted)"
                activeDot={{ r: 6, fill: primaryColor, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionChart;
