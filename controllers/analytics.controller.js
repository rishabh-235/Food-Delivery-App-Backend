import { Analytics } from "../models/analytics.model.js";
import Order from "../models/order.model.js";

const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findById('683b0fa6f1c4f9095a9d47ef');
    if (!analytics) {
      return res
        .status(404)
        .json({ message: "No analytics found for this date" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error fetching daily analytics:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
};

const getTodayOrderSummary = async (req, res) => {
  // number of delivered, Dine In, and Take Away orders of the day
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const deliveredOrders = await Order.aggregate([
      { $match: { status: "served", createdAt: { $gte: startOfDay, $lt: endOfDay } } },
      { $count: "deliveredCount" }
    ]);

    const dineInOrders = await Order.aggregate([
      { $match: { mode: "Dine In", createdAt: { $gte: startOfDay, $lt: endOfDay } } },
      { $count: "dineInCount" }
    ]);

    const takeAwayOrders = await Order.aggregate([
      { $match: { mode: "Take Away", createdAt: { $gte: startOfDay, $lt: endOfDay } } },
      { $count: "takeAwayCount" }
    ]);

    const totalOrders = (dineInOrders[0]?.dineInCount || 0) + (takeAwayOrders[0]?.takeAwayCount || 0);
    const dineInCount = dineInOrders[0]?.dineInCount || 0;
    const takeAwayCount = takeAwayOrders[0]?.takeAwayCount || 0;
    const deliveredCount = deliveredOrders[0]?.deliveredCount || 0;

    const dineInCountPrecent = ((dineInCount)/totalOrders) * 100;
    const takeAwayCountPrecent = ((takeAwayCount)/totalOrders) * 100;
    const deliveredCountPrecent = ((deliveredCount)/totalOrders) * 100;

    res.status(200).json({
      dineInCountPrecent,
      takeAwayCountPrecent,
      deliveredCountPrecent,
      dineInCount,
      takeAwayCount,
      deliveredCount,
    });
  } catch (error) {
    console.error("Error fetching today's order summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getMonthlyOrderSummary = async (req, res) => {
  // number of delivered, Dine In, and Take Away orders of the month
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const deliveredOrders = await Order.aggregate([
      { $match: { status: "served", createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
      { $count: "deliveredCount" }
    ]);

    const dineInOrders = await Order.aggregate([
      { $match: { mode: "Dine In", createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
      { $count: "dineInCount" }
    ]);

    const takeAwayOrders = await Order.aggregate([
      { $match: { mode: "Take Away", createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
      { $count: "takeAwayCount" }
    ]);

    const totalOrders = (dineInOrders[0]?.dineInCount || 0) + (takeAwayOrders[0]?.takeAwayCount || 0);
    const dineInCount = dineInOrders[0]?.dineInCount || 0;
    const takeAwayCount = takeAwayOrders[0]?.takeAwayCount || 0;
    const deliveredCount = deliveredOrders[0]?.deliveredCount || 0;

    const dineInCountPrecent = ((dineInCount)/totalOrders) * 100;
    const takeAwayCountPrecent = ((takeAwayCount)/totalOrders) * 100;
    const deliveredCountPrecent = ((deliveredCount)/totalOrders) * 100;

    res.status(200).json({
      dineInCount,
      takeAwayCount,
      deliveredCount,
      dineInCountPrecent,
      takeAwayCountPrecent,
      deliveredCountPrecent
    });
  } catch (error) {
    console.error("Error fetching this month's order summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getYearlyOrderSummary = async (_, res) => {
  // number of delivered, Dine In, and Take Away orders of the year
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear() + 1, 0, 1);

    const deliveredOrders = await Order.aggregate([
      { $match: { status: "served", createdAt: { $gte: startOfYear, $lt: endOfYear } } },
      { $count: "deliveredCount" }
    ]);

    const dineInOrders = await Order.aggregate([
      { $match: { mode: "Dine In", createdAt: { $gte: startOfYear, $lt: endOfYear } } },
      { $count: "dineInCount" }
    ]);

    const takeAwayOrders = await Order.aggregate([
      { $match: { mode: "Take Away", createdAt: { $gte: startOfYear, $lt: endOfYear } } },
      { $count: "takeAwayCount" }
    ]);

    const totalOrders = (dineInOrders[0]?.dineInCount || 0) + (takeAwayOrders[0]?.takeAwayCount || 0);
    const dineInCount = dineInOrders[0]?.dineInCount || 0;
    const takeAwayCount = takeAwayOrders[0]?.takeAwayCount || 0;
    const deliveredCount = deliveredOrders[0]?.deliveredCount || 0;

    const dineInCountPrecent = ((dineInCount)/totalOrders) * 100;
    const takeAwayCountPrecent = ((takeAwayCount)/totalOrders) * 100;
    const deliveredCountPrecent = ((deliveredCount)/totalOrders) * 100;

    res.status(200).json({
      dineInCount,
      takeAwayCount,
      deliveredCount,
      dineInCountPrecent,
      takeAwayCountPrecent,
      deliveredCountPrecent
    });
  } catch (error) {
    console.error("Error fetching this year's order summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getWeeklyRevenueSummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);

    const revenueSummary = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfWeek, $lt: endOfWeek } } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalRevenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format the response to include day names and revenue
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const formattedRevenueSummary = revenueSummary.map(item => ({
      label: daysOfWeek[item._id - 1], // Adjusting for MongoDB's 1-based index for days of the week
      totalRevenue: item.totalRevenue
    }));

    res.status(200).json(formattedRevenueSummary);
  } catch (error) {
    console.error("Error fetching this week's revenue summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMonthlyRevenueSummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const revenueSummary = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth, $lt: endOfMonth } } },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          totalRevenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format the response to include day numbers and revenue
    const formattedRevenueSummary = revenueSummary.map(item => ({
      label: item._id,
      totalRevenue: item.totalRevenue
    }));

    res.status(200).json(formattedRevenueSummary);
  } catch (error) {
    console.error("Error fetching this month's revenue summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getYearlyRevenueSummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear() + 1, 0, 1);

    const revenueSummary = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfYear, $lt: endOfYear } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format the response to include month numbers and revenue
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedRevenueSummary = revenueSummary.map(item => ({
      label: monthNames[item._id - 1],
      totalRevenue: item.totalRevenue
    }));

    res.status(200).json(formattedRevenueSummary);
  } catch (error) {
    console.error("Error fetching this year's revenue summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export { getAnalytics, getTodayOrderSummary, getMonthlyOrderSummary, getYearlyOrderSummary, getWeeklyRevenueSummary, getMonthlyRevenueSummary, getYearlyRevenueSummary };