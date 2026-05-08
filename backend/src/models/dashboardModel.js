import pool from "../config/db.js";

export const getDashboardStats = async () => {
  const [rows] = await pool.query(`
    SELECT
      COUNT(*) AS total_leads,
      SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS new_leads,
      SUM(CASE WHEN status = 'Qualified' THEN 1 ELSE 0 END) AS qualified_leads,
      SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) AS won_leads,
      SUM(CASE WHEN status = 'Lost' THEN 1 ELSE 0 END) AS lost_leads,
      COALESCE(SUM(deal_value), 0) AS total_deal_value,
      COALESCE(SUM(CASE WHEN status = 'Won' THEN deal_value ELSE 0 END), 0) AS won_deal_value
    FROM leads
  `);

  return rows[0] ?? {};
};
