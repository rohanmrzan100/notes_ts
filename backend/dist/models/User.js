"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        select: false,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});
userSchema.pre("save", function (next) {
    const salt = bcrypt_1.default.genSaltSync(10);
    this.password = bcrypt_1.default.hashSync(this.password, salt);
    next();
});
const userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
