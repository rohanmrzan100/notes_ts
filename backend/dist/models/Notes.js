"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        // required:true
    },
}, { timestamps: true });
const noteModel = mongoose_1.default.model("note", noteSchema);
exports.default = noteModel;
