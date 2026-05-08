import { getDashboardStats } from "../models/dashboardModel.js";

export const getDashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.json({
      success: true,
      message: "Dashboard fetched",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
