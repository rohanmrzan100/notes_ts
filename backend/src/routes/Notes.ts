import express from "express";
import {
  addNote,
  getNote,
  updateNote,
  deleteNote,
  getUserNotes,
} from "../controllers/Notes";
import authMiddleware from "../middleware/Auth";

const router = express.Router();




router.route("/").get(authMiddleware,getUserNotes)


router.post("/",authMiddleware, addNote);


router.get("/:id",getNote)
router.patch("/:id", authMiddleware,updateNote);
router.delete("/:id", deleteNote);

export default router;
