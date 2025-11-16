import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// 👉 THÊM LOG ĐỂ XEM RENDER ĐANG NHẬN ENV GÌ
console.log("DB config (no password):", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // 👉 NÊN ÉP KIỂU PORT THÀNH NUMBER
  port: Number(process.env.DB_PORT),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // ⚠️ Aiven REQUIRE SSL
  ssl: {
    rejectUnauthorized: true,
  },
});

console.log("✅ MySQL pool created (smartwasher)");
export default pool;
