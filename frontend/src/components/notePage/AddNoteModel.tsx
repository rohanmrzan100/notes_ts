import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toggleModal } from "../../store/slice/modalSlice";
import { addNote } from "../../API/Notes";
import { errorToast, successToast } from "../HOC/Toast";
import { sendToken } from "../../store/slice/authSlice";
interface NoteBody {
  title: string;
  text?: string;
}
export default function Modal() {
  const showModal = useAppSelector((state) => state.modal.toggle);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const note: NoteBody = {
      title: e.target[0].value,
      text: e.target[1].value,
    };
    dispatch(
      sendToken({
        token: localStorage.getItem("token"),
      })
    );
    addNote(note)
      .then((res) => {
        dispatch(toggleModal([]));
        successToast("Note Added SucessFully");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        errorToast(error);
      });
  };
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center min-w-[300px] items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              className="relative w-auto m-6  max-w-3xl  mx-16"
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Add Note</h3>
                  <div
                    className="px-2 py-1 ml-auto border  text-black rounded float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:bg-red-400 "
                    onClick={() => {
                      dispatch(toggleModal([]));
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
                      Add
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
