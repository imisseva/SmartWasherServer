// models/Payment.js
import db from "../db.js";

export async function createPayment({ user_id, txn_ref, amount, order_info, response_code, transaction_no, bank_code, pay_date, status }) {
  const [result] = await db.execute(
    `INSERT INTO payment (user_id, txn_ref, amount, order_info, response_code, transaction_no, bank_code, pay_date, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, txn_ref, amount, order_info, response_code, transaction_no, bank_code, pay_date, status]
  );
  return result.insertId;
}

export async function getPaymentByTxnRef(txn_ref) {
  const [rows] = await db.execute("SELECT * FROM payment WHERE txn_ref = ?", [txn_ref]);
  return rows[0];
}

export async function updatePaymentStatus(txn_ref, status, response_code, transaction_no, pay_date) {
  await db.execute(
    `UPDATE payment SET status = ?, response_code = ?, transaction_no = ?, pay_date = ? WHERE txn_ref = ?`,
    [status, response_code, transaction_no, pay_date, txn_ref]
  );
}

export async function getPaymentsByUserId(user_id) {
  const [rows] = await db.execute("SELECT * FROM payment WHERE user_id = ? ORDER BY created_at DESC", [user_id]);
  return rows;
}