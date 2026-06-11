import Category from "../models/Category.js";
import Task from "../models/Task.js";

// GET /api/categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id }).sort({
      createdAt: 1,
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Lỗi khi gọi getAllCategories:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Tên danh mục là bắt buộc." });
    }

    const category = new Category({
      name: name.trim(),
      color: color || "#7c3aed",
      userId: req.user._id,
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Lỗi khi gọi createCategory:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, color },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Lỗi khi gọi updateCategory:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    // Set tasks thuộc category này về null
    await Task.updateMany(
      { categoryId: req.params.id, userId: req.user._id },
      { categoryId: null }
    );

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    console.error("Lỗi khi gọi deleteCategory:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Tạo categories mặc định cho user mới
export const createDefaultCategories = async (userId) => {
  const defaults = [
    { name: "Công việc", color: "#3b82f6" },
    { name: "Cá nhân", color: "#10b981" },
    { name: "Học tập", color: "#f59e0b" },
    { name: "Khác", color: "#8b5cf6" },
  ];

  const categories = defaults.map((cat) => ({
    ...cat,
    userId,
  }));

  await Category.insertMany(categories);
};
