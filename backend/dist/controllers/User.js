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
exports.login = exports.register = void 0;
require("dotenv/config");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please provide all required data" });
        }
        const checkUser = yield User_1.default.findOne({ email: email });
        if (checkUser)
            return res.status(400).json({ msg: "Email is already Taken" });
        const user = new User_1.default({
            name: name,
            email: email,
            password: password,
        });
        const doc = yield user.save();
        res.status(201).json({ doc: doc, msg: "User Added Successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide all required data" });
        }
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "Emailnot found. Make sure you are registered" });
        }
        const isMatch = bcrypt_1.default.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password is incorrect" });
        }
        // res.status(200).json({ token: token, msg: "Login Successful" });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
