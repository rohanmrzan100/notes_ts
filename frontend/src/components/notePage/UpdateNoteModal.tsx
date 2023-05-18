import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toggleModal, updateToggle } from "../../store/slice/modalSlice";
import { loadNoteById, updateNote } from "../../API/Notes";
import { errorToast, successToast } from "../HOC/Toast";
import { useNavigate } from "react-router-dom";
import { loading } from "../../store/slice/authSlice";
import { Note } from "../../modals/Notes";

interface updateBody {
  title: string;
  text?: string;
  id: string;
}
export default function UpdateNoteModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [text, setText] = useState(" ");
  const [title, setTitle] = useState(" ");
  // const [note, setNote] = useState<Note>();
  const postId = useAppSelector((state) => state.modal._id);
  useEffect(() => {
  loadNoteById(postId).then(note=>{
 
    setTitle(note.note.title);
    setText(note.note.text);
  })
  
      

  
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const note: updateBody = {
      title: e.target[0].value,
      text: e.target[1].value,
      id: postId,
    };
    dispatch(loading({ type: "true" }));

    updateNote(note)
      .then((res) => {
        dispatch(loading({ type: "false" }));
        dispatch(updateToggle([]));
        successToast("Note Updated");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        errorToast("Updated " + error.response.data.error);
        dispatch(loading({ type: "false" }));
      });
  };
  return (
    <>
      {
        <>
          <div className="justify-center items-center min-w-[300px] flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              className="relative w-auto m-6  max-w-3xl  mx-16"
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Update Note</h3>
                  <div
                    className="px-2 py-1 ml-auto border  text-black rounded float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:bg-red-400 "
                    onClick={() => {
                      dispatch(updateToggle([]));
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-3 m-4 flex-auto  w-auto ">
                  <div className="flex flex-col  ">
                    <label className="mb-3 text-lg leading-none text-gray-800">
                      Title
                    </label>
                    <input
                      placeholder={title}
                      type="text"
                      name="title"
                      aria-label="Enter title"
                      className="w-[40vw] min-w- bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    />
                  </div>
                  <div className="flex flex-col mt-4 ">
                    <label className="mb-3 text-lg leading-none text-gray-800">
                      Text
                    </label>
                    <textarea
                      placeholder={text}
                      rows={10}
                      name="text"
                      aria-label="Enter text"
                      className="w-[40vw] h-52 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                    />
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    type="submit"
                    className="active:scale-105 rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-400  text-white"
                  >
                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
                      Update
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
      }
    </>
  );
}
