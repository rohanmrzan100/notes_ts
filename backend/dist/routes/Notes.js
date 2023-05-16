"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Notes_1 = require("../controllers/Notes");
const router = express_1.default.Router();
router.get("/", Notes_1.getNotes);
router.post("/", Notes_1.addNote);
router.get("/:id", Notes_1.getNote);
router.patch("/:id", Notes_1.updateNote);
router.delete("/:id", Notes_1.deleteNote);
exports.default = router;
