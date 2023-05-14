import React, { useEffect, useState } from "react";
import { Note } from "../../modals/Notes";
import * as NoteAPI from "../../API/Notes";
import NoteCard from "./NoteCard";
import AddNoteModel from "./AddNoteModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { toggleModal } from "../../store/slice/modalSlice";

import { useAppDispatch } from "../../store/hook";

const Landing = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    NoteAPI.loadNotes()
      .then((res) => setNotes(res.reverse()))
      .catch((err) => {
        const errorMsg = err.error;
        console.log(errorMsg);
        alert(errorMsg.toString());
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <NoteCard note={note} key={note._id} />
        ))}
      </div>
      <AddNoteModel />
      <div className="fixed bottom-0 w-full">
        <button
          onClick={() => {
            dispatch(toggleModal([]));
          }}
          className="m-8 float-left p-4 h-16 w-16 hover:bg-yellow-600 active:bg-yellow-400 bg-yellow-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
      </div>
    </>
  );
};

export default Landing;
