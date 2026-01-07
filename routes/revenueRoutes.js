// routes/revenueRoutes.js
import express from "express";
import { getRevenueStats } from "../controllers/revenueController.js";

const router = express.Router();

// Lấy thống kê doanh thu
router.get("/", getRevenueStats);

export default router;