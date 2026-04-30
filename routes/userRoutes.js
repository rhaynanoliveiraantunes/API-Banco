import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);

router.get("/:id", userController.getIdUsers);
router.put("/:id", userController.updateUser); 
router.delete("/:id", userController.deleteUser);
router.get("/cpf/:cpf", userController.getcpfUsers);
router.get("/email/:email", userController.getEmailUsers);


export default router; 