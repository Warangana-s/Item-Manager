import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

// ✅ FIXED CORS (allow local + deployed)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://item-manager-gv7u-h51jpqzx6-waranganasathmini-2692s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

// routes
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });