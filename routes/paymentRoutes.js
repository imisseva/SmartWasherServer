// routes/paymentRoutes.js
import express from "express";
import { createPaymentRecord, updatePayment, getUserPayments } from "../controllers/paymentController.js";

const router = express.Router();

// Tạo payment record
router.post("/", createPaymentRecord);

// Cập nhật payment status (từ VNPay callback)
router.put("/update", updatePayment);

// Lấy lịch sử thanh toán của user
router.get("/user/:userId", getUserPayments);

export default router;