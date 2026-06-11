import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ListTodo, Percent } from "lucide-react";

const StatsOverview = ({ data }) => {
  if (!data) return null;

  const statCards = [
    {
      title: "Tổng nhiệm vụ",
      value: data.totalTasks,
      icon: <ListTodo className="size-4 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Đang làm",
      value: data.activeTasks,
      icon: <Circle className="size-4 text-info" />,
      color: "bg-info/10",
    },
    {
      title: "Hoàn thành",
      value: data.completeTasks,
      icon: <CheckCircle2 className="size-4 text-success" />,
      color: "bg-success/10",
    },
    {
      title: "Tỷ lệ",
      value: `${data.completionRate}%`,
      icon: <Percent className="size-4 text-fuchsia-500" />,
      color: "bg-fuchsia-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statCards.map((stat, i) => (
        <Card
          key={i}
          className="border-0 bg-card/80 backdrop-blur-sm shadow-custom-sm hover:shadow-custom-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
