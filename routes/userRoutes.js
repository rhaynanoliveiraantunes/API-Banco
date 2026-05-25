import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);

router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getIdUsers);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/cpf/:cpf", authMiddleware, userController.getcpfUsers);
router.get("/email/:email", authMiddleware, userController.getEmailUsers);

export default router;