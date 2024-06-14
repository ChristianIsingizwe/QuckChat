import { Router } from "express";
import {
  registerUser,
  loginUser,
  findUser,
  findUsers,
  logoutUser
} from "../controllers/userController.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", findUser);
router.get("/", findUsers);
router.post('/logout', logoutUser)


export default router;
