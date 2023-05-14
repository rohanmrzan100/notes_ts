import { RequestHandler } from "express";
import noteModel from "../models/Notes";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
interface addNoteBody {
  title: string;
  text?: string;
}
export const addNote: RequestHandler<
  unknown,
  unknown,
  addNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const { text, title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Note must have a title" });
    }
    const note = new noteModel({
      title: title,
      text: text,
    });

    const doc = await note.save();
    res.status(201).json({ doc: doc });
  } catch (error) {
    next(error);
  }
};

interface updateNoteBody {
  title?: string;
  text?: string;
}
interface updateNoteParams {
  id: string;
}
export const getNote: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody
> = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Note Id is invalid" });
    }
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ doc: note });
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Note Id is invalid" });
    }
    if (!title) {
      return res.status(400).json({ error: "Note must have a title" });
    }
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    note.title = title;
    note.text = text;
    const updatedNote = await note.save();
    res.status(200).json({updatedNote,msg:"Note is Updated"})
  } catch (error) {
    next(error);
  }
};

interface deleteNoteID {
  id:string
}
export const deleteNote:RequestHandler<deleteNoteID> = async (req,res,next)=>{
  try {
    const id = req.params.id
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({ error: "Note Id is invalid" });
    }  const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({msg:"Note is deleted"})
  } catch (error) {
    next(error)
  }
}