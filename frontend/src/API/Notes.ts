import axios,{AxiosError} from "axios";

import {Note} from "../modals/Notes"
import { get } from "http";
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] =
  "application/json";

export async function loadNotes():Promise<Note[]> {
  try {
    const response = await axios.get("api/notes");

    return response.data;
  } catch (error) {

    const err = error as AxiosError;
    throw err.response?.data

  }
}

interface noteInput {
    title:string,
    text?:string
}

export async function addNote(note: noteInput): Promise<Note> {
  try {
    const response = await axios.post("api/notes", note);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data;
  }
}


export async function deleteNote(_id: string): Promise<string> {
  try {
    const response = await axios.delete(`api/notes/${_id}`);
    return response.data
  } catch (error) {
    const err = error as AxiosError;
    throw err.response?.data;
  }
}