import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export interface Iuser {
  _id: mongoose.Types.ObjectId;
  name: string;
  lat: number;
  exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  

  if (!token) {
    console.log(token);
    
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.SECRET!);

  res.locals.user = decoded;

  next();
};

export default authMiddleware;
