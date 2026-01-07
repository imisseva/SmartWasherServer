// controllers/revenueController.js
import { getDailyRevenue, getRevenueByDateRange, getMonthlyRevenue } from "../models/Revenue.js";

export const getRevenueStats = async (req, res) => {
  try {
    const { date, startDate, endDate, year, month } = req.query;

    let data;
    if (year && month) {
      data = await getMonthlyRevenue(parseInt(year), parseInt(month));
    } else if (startDate && endDate) {
      data = await getRevenueByDateRange(startDate, endDate);
    } else if (date) {
      data = await getDailyRevenue(date);
      if (!data) {
        return res.json({ success: true, data: { date, total_income: 0, total_washes: 0 } });
      }
    } else {
      return res.status(400).json({ success: false, message: "Thiếu tham số date, startDate/endDate, hoặc year/month" });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error("Lỗi lấy revenue:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};