"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNote = exports.addNote = exports.getNotes = void 0;
const Notes_1 = __importDefault(require("../models/Notes"));
const mongoose_1 = __importDefault(require("mongoose"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Notes_1.default.find();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const addNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Note must have a title" });
        }
        const note = new Notes_1.default({
            title: title,
            text: text,
        });
        const doc = yield note.save();
        res.status(201).json({ doc: doc });
    }
    catch (error) {
        next(error);
    }
});
exports.addNote = addNote;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ error: "Note Id is invalid" });
        }
        const note = yield Notes_1.default.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json({ doc: note });
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, text } = req.body;
        const id = req.params.id;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ error: "Note Id is invalid" });
        }
        if (!title) {
            return res.status(400).json({ error: "Note must have a title" });
        }
        const note = yield Notes_1.default.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        note.title = title;
        note.text = text;
        const updatedNote = yield note.save();
        res.status(200).json({ updatedNote, msg: "Note is Updated" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ error: "Note Id is invalid" });
        }
        const note = yield Notes_1.default.findById(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        yield Notes_1.default.findByIdAndDelete(id);
        res.status(200).json({ msg: "Note is deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
