import express from "express";
import {
  getNotes,
  addNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/Notes";

const router = express.Router();




router.get("/", getNotes);
router.post("/", addNote);

router.get("/:id",getNote)
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
