"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app = (0, express_1.default)();
mongoose_1.default
    .connect(`mongodb+srv://rohanmrzan100:${process.env.MONGODB_PW}@cluster0.8eze3i1.mongodb.net/notesAPP`)
    .then(() => {
    const port = process.env.port || 3001;
    app.listen(3001, () => {
        console.log(`APP is running on port ${port}`);
    });
    console.log("connected to DB");
});
