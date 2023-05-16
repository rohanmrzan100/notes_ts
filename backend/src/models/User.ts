import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Note } from "./Notes";

interface User{
  _id:mongoose.Types.ObjectId;
  email:string;
  name:string;
  password:string,
  notes:[mongoose.Types.ObjectId]
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  notes: [{ type: mongoose.Types.ObjectId, ref: "note"}],
});

// type User = InferSchemaType<typeof userSchema>;



const userModel = mongoose.model<User>("user", userSchema);
export default userModel;
export {User}
