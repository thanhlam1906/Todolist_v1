import Task from "../models/Task.js";
import mongoose from "mongoose";

// GET /api/stats/overview
export const getOverview = async (req, res) => {
  try {
    const result = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $facet: {
          total: [{ $count: "count" }],
          active: [{ $match: { status: "active" } }, { $count: "count" }],
          complete: [{ $match: { status: "complete" } }, { $count: "count" }],
        },
      },
    ]);

    const totalTasks = result[0].total[0]?.count || 0;
    const activeTasks = result[0].active[0]?.count || 0;
    const completeTasks = result[0].complete[0]?.count || 0;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completeTasks / totalTasks) * 100);

    res.status(200).json({
      totalTasks,
      activeTasks,
      completeTasks,
      completionRate,
    });
  } catch (error) {
    console.error("Lỗi khi gọi getOverview:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// GET /api/stats/weekly
export const getWeeklyStats = async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const result = await Task.aggregate([
      {
        $match: {
          userId: req.user._id,
          status: "complete",
          completedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$completedAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Tạo mảng đủ 7 ngày kể cả ngày không có task hoàn thành
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0]; // YYYY-MM-DD
      
      const found = result.find((item) => item._id === dateString);
      last7Days.push({
        date: d.toLocaleDateString("vi-VN", { weekday: "short", day: "numeric" }),
        completed: found ? found.count : 0,
      });
    }

    res.status(200).json(last7Days);
  } catch (error) {
    console.error("Lỗi khi gọi getWeeklyStats:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// GET /api/stats/categories
export const getCategoryStats = async (req, res) => {
  try {
    const result = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: "$categoryId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: { $ifNull: ["$category.name", "Không có danh mục"] },
          color: { $ifNull: ["$category.color", "#cbd5e1"] }, // slate-300
          value: "$count",
        },
      },
      { $sort: { value: -1 } },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi gọi getCategoryStats:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
