import mongoose from "mongoose";
import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const {
    filter = "today",
    category,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = { userId: req.user._id };
  if (startDate) {
    query.createdAt = { $gte: startDate };
  }
  if (category) {
    query.categoryId = new mongoose.Types.ObjectId(category);
  }
  if (search?.trim()) {
    query.title = { $regex: search.trim(), $options: "i" };
  }

  // Sort
  const sortOptions = {};
  const validSortFields = ["createdAt", "title", "dueDate", "priority"];
  const field = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  sortOptions[field] = sortOrder === "asc" ? 1 : -1;

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [
            { $sort: sortOptions },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $addFields: {
                category: { $arrayElemAt: ["$category", 0] },
              },
            },
          ],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, categoryId, dueDate, priority } = req.body;
    const task = new Task({
      title,
      userId: req.user._id,
      categoryId: categoryId || null,
      dueDate: dueDate || null,
      priority: priority || "medium",
    });

    const newTask = await task.save();

    // Populate category
    const populated = await Task.findById(newTask._id).populate(
      "categoryId",
      "name color"
    );

    res.status(201).json(populated);
  } catch (error) {
    console.error("Lỗi khi gọi createTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt, categoryId, dueDate, priority } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (status !== undefined) updateData.status = status;
    if (completedAt !== undefined) updateData.completedAt = completedAt;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (priority !== undefined) updateData.priority = priority;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("categoryId", "name color");

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    console.error("Lỗi khi gọi deleteTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
