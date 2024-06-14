import { Router } from "express";
import {
  registerUser,
  loginUser,
  findUser,
  findUsers,
  getProfile,
} from "../controllers/userController.js";

import { isAuth } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", isAuth, findUser);
router.get("/", isAuth, findUsers);
router.get("/getProfile", isAuth, getProfile);

export default router;
