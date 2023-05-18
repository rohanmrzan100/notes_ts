import axios, { AxiosError } from "axios";
import { Note } from "../modals/Notes";
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const headers: any = {
  Authorization: localStorage.getItem("token"),
};
export async function loadNotes(): Promise<Note[]> {
  const response = await axios.get("api/notes", {
    headers: { Authorization: localStorage.getItem("token") },
  });

  return response.data;
}

interface noteInput {
  title: string;
  text?: string;
}

export async function loadNoteById(id: string) {
  const response = await axios.get(`api/notes/${id}`);

  return response.data;
}

interface noteInput {
  title: string;
  text?: string;
}

export async function addNote(note: noteInput): Promise<Note> {
  const response = await axios.post("api/notes", note, {
    headers: headers,
  });
  return response.data;
}
interface updateInput {
  title: string;
  text?: string;
  id: string;
}

export async function updateNote(data: updateInput): Promise<Note> {
  const response = await axios.patch(
    `api/notes/${data.id}`,
    {
      title: data.title,
      text: data.text,
    },
    {
      headers: headers,
    }
  );
  return response.data;
}

export async function deleteNote(_id: string): Promise<string> {
  const response = await axios.delete(`api/notes/${_id}`);

  return response.data;
}
