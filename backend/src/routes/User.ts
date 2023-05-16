import express from "express";
import authMiddleware from "../middleware/Auth";
import { register, login, temp, getAllUser } from "../controllers/User";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", authMiddleware,temp)
router.get("/", getAllUser);

export default router;
