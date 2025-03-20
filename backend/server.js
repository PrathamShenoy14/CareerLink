import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import predictCareerRoute from './routes/predictCareer.js'

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend to make requests
    credentials: true,
  }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/predict-career", predictCareerRoute);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
