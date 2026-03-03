import express from "express";
import authController from "./auth.controller.js";
import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register-users", authController.registerUsers);
router.post("/login-users", authController.loginUsers);
router.get("/users", protect, authController.getUsers);
router.get("/me", protect, authController.getMe);
router.delete("/users/:id", protect, authController.deleteUser);

export default router;
