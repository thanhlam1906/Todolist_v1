import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import authRoute from "./routes/authRouters.js";
import categoryRoute from "./routes/categoryRouters.js";
import statsRoute from "./routes/statsRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/stats", statsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});
