import { Router } from "express";

const router = Router();

//define the routes for order
import { addOrder, getOrders, updateOrder } from "../controllers/order.controller.js";
import { getItemsByCategory, getItemById } from "../controllers/item.controller.js";
import { allocateTable } from "../controllers/table.controller.js";
import { allocateChef } from "../controllers/chef.controller.js";

// Route to get menu items by category
router.post("/getitemsbycategory", getItemsByCategory);
router.post("/get-item", getItemById);

// Route to add a new order
router.post("/add-order", allocateTable, addOrder, allocateChef);

// Route to get all orders
router.get("/get-orders", getOrders);

// Route to update an order
router.put("/update-order", updateOrder);

export default router;