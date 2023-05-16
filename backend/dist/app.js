"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const Notes_1 = __importDefault(require("./routes/Notes"));
const User_1 = __importDefault(require("./routes/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/notes", Notes_1.default);
app.use("/api/user", User_1.default);
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});
app.use((error, req, res, next) => {
    let errorMessage = "An error in server has occured";
    if (error instanceof Error)
        errorMessage = error.message;
    console.log(error);
    res.status(500).json({ error: errorMessage });
});
exports.default = app;
