import React, { useEffect, useState } from "react";
import { Note } from "../../modals/Notes";
import { loadNotes } from "../../API/Notes";
import NoteCard from "./NoteCard";
import AddNoteModel from "./AddNoteModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toggleModal } from "../../store/slice/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { errorToast } from "../HOC/Toast";
import { sendToken } from "../../store/slice/authSlice";
import DeleteModal from "./DeleteModal";
import UpdateNoteModal from "./UpdateNoteModal";
const Landing = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [empty, setEmpty] = useState(false);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const deleteToggle = useAppSelector((state) => state.modal.deleteToggle);
    const updateToggle = useAppSelector((state) => state.modal.updateToggle);
  const emptyMsg = "There are no notes. Create notes now";
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadNotes()
      .then((res) => {
        setNotes(res);
        res.length<=0 ?setEmpty(true) : setEmpty(false)
        dispatch(
          sendToken({
            token: localStorage.getItem("token"),
          })
        );
      })
      .catch((err) => {
        errorToast(err.response.data.message + " Please Login");
      });
  }, []);

  return (
    <>
      {empty && <h1>{emptyMsg}</h1>}
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <NoteCard note={note} key={note._id} />
        ))}
      </div>
      <AddNoteModel />
      {isAuth && (
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
      )}
      {deleteToggle && <DeleteModal/>}
      {updateToggle && <UpdateNoteModal/>}
    </>
  );
};

export default Landing;
