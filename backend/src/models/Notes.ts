
import mongoose, { InferSchemaType } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      // required:true
    },
  },
  { timestamps: true }
);


type Note = InferSchemaType< typeof noteSchema>



const noteModel = mongoose.model<Note>("note",noteSchema)


export default noteModel