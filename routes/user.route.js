import { Router } from "express";

const router = Router();

import { addUser, getUser } from "../controllers/user.controller.js";

router.post("/add-user", addUser);
router.get("/get-user", getUser);

export default router;