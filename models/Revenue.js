// models/Revenue.js
import db from "../db.js";

export async function getDailyRevenue(date) {
  const [rows] = await db.execute("SELECT * FROM daily_revenue WHERE date = ?", [date]);
  return rows[0];
}

export async function getRevenueByDateRange(startDate, endDate) {
  const [rows] = await db.execute("SELECT * FROM daily_revenue WHERE date BETWEEN ? AND ? ORDER BY date DESC", [startDate, endDate]);
  return rows;
}

export async function getMonthlyRevenue(year, month) {
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // Last day of month
  return await getRevenueByDateRange(startDate, endDate);
}