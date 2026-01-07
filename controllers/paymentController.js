// controllers/paymentController.js
import { createPayment, getPaymentByTxnRef, updatePaymentStatus, getPaymentsByUserId } from "../models/Payment.js";

export const createPaymentRecord = async (req, res) => {
  try {
    const { user_id, txn_ref, amount, order_info } = req.body;
    if (!user_id || !txn_ref || !amount) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin thanh toán" });
    }

    const paymentId = await createPayment({
      user_id,
      txn_ref,
      amount,
      order_info,
      status: 'pending'
    });

    res.json({ success: true, paymentId });
  } catch (err) {
    console.error("Lỗi tạo payment:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { txn_ref, status, response_code, transaction_no, pay_date } = req.body;
    if (!txn_ref || !status) {
      return res.status(400).json({ success: false, message: "Thiếu txn_ref hoặc status" });
    }

    await updatePaymentStatus(txn_ref, status, response_code, transaction_no, pay_date);
    res.json({ success: true });
  } catch (err) {
    console.error("Lỗi cập nhật payment:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const payments = await getPaymentsByUserId(user_id);
    res.json({ success: true, payments });
  } catch (err) {
    console.error("Lỗi lấy payments:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};