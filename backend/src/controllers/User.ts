import "dotenv/config";
import { RequestHandler } from "express";
import userModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const temp: RequestHandler = async (req, res, next) => {
  //

  const userID = res.locals.user._id;
  if (!mongoose.isValidObjectId(userID)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }
  const user = await userModel.findById(userID).select("+email");
  res.status(200).json(user);
};

interface registerBody {
  name?: string;
  email?: string;
  password?: string;
}

export const register: RequestHandler<
  unknown,
  unknown,
  registerBody,
  unknown
> = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required data" });
    }
    const checkUser = await userModel.findOne({ email: email });
    if (checkUser)
      return res.status(400).json({ error: "Email is already taken." });

    const salt = bcrypt.genSaltSync(10);
    const Hashpassword = bcrypt.hashSync(password, salt);

    const user = new userModel({
      name: name,
      email: email,
      password: Hashpassword,
    });

    const doc = await user.save();

    res.status(201).json({ doc: doc });
  } catch (error) {
    next(error);
  }
};

interface loginBody {
  email: string;
  password: string;
}
export const login: RequestHandler<unknown, unknown, loginBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide all required data" });
    }
    const user = await userModel
      .findOne({ email: email })
      .select(" +email +password");
    if (!user) {
      return res.status(400).json({ msg: "Email not found." });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.SECRET!,
      { expiresIn: "3d" }
    );
    res.status(200).json({ msg: "Login Successful", token: token ,user});
  } catch (error) {
    next(error);
  }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel.find().select("+email");
    res.status(400).json(user);
  } catch (error) {
    next(error);
  }
};

