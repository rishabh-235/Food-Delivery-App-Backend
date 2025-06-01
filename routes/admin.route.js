import { Router } from "express";

const router = Router();

import { addTable, getTables, removeTable } from "../controllers/table.controller.js";
import { getAnalytics, getMonthlyOrderSummary, getMonthlyRevenueSummary, getTodayOrderSummary, getWeeklyRevenueSummary, getYearlyOrderSummary, getYearlyRevenueSummary } from "../controllers/analytics.controller.js";
import { getChefs } from "../controllers/chef.controller.js";

//define the routes for admin

router.post("/add-table", addTable);
router.get("/get-tables", getTables);
router.delete("/remove-table", removeTable);
router.get("/get-analytics", getAnalytics);
router.get("/get-chefs", getChefs);
router.get("/get-today-order-summary", getTodayOrderSummary);
router.get("/get-monthly-order-summary", getMonthlyOrderSummary);
router.get("/get-yearly-order-summary", getYearlyOrderSummary);
router.get("/get-weekly-revenue-summary", getWeeklyRevenueSummary);
router.get("/get-monthly-revenue-summary", getMonthlyRevenueSummary);
router.get("/get-yearly-revenue-summary", getYearlyRevenueSummary);

export default router;