import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteToggle } from "../../store/slice/modalSlice";
import { deleteNote } from "../../API/Notes";
import { errorToast, successToast } from "../HOC/Toast";
import { useNavigate } from "react-router-dom";
import { loading } from "../../store/slice/authSlice";

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const noteId = useAppSelector((state) => state.modal._id);
  const handleClick = () => {
    dispatch(loading({ type: "true" }));
    deleteNote(noteId)
      .then((res) => {
        dispatch(loading({ type: "false" }));
        dispatch(deleteToggle([]));
        successToast("Note Deleted");
        navigate("/");
      })
      .catch((error) => {
      
        dispatch(loading({ type: "false" }));
        console.log(error.response.data.error);
        errorToast("Could not delete note. "+error.response.data.error);
      });
  };
  return (
    <>
      <div className="justify-center items-center min-w-[300px] flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  w-1/2 m-auto outline-none focus:outline-none ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between p-4 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-xl  font-semibold">Are you sure?</h3>
            <div
              className="px-2 py-1 ml-auto border  text-black rounded float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:bg-red-400 "
              onClick={() => {
                dispatch(deleteToggle([]));
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <p className="px-4 py-12">
            Are you sure your want to delete this note?
          </p>

          {/*footer*/}
          <div className="flex items-center justify-end px-4 olid border-slate-200 rounded-b">
            <button
              onClick={handleClick}
              className="active:scale-105 rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-400  text-white"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-red-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-red-600 transition duration-300 group-hover:text-white ease">
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DeleteModal;
