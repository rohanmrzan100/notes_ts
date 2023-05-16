import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Note } from "../../modals/Notes";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { deleteToggle, updateToggle } from "../../store/slice/modalSlice";
interface noteProps {
  note: Note;
}

const NoteCard = ({ note }: noteProps) => {
  const { createdAt, updatedAt, _id } = note;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let createdUpdatedText: string;
  if (createdAt > updatedAt) {
    createdUpdatedText = moment().format("YYYY MM DD,  h:mm:ss a");
  } else {
    createdUpdatedText = moment(createdAt).format("YYYY MM DD,  h:mm a");
  }
  const handleEdit = () => {
    dispatch(updateToggle(_id));
  };
  const handleDelete = () => {
    dispatch(deleteToggle(_id));
  };
  return (
    <>
      <div className="rounded-xl border border-black h-150 min-h-full p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-black text-xl font-semibold ">{note.title}</h3>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
        {note.text ? (
          <p className="text-gray-600 text-justify text-sm  h-full">
            {note.text.length < 200
              ? note.text
              : note.text.substring(0, 200) + " ......"}
          </p>
        ) : null}
        <div className="text-gray-800 mt-4 flex justify-between">
          <div className="flex flex-col text-xs">
            <p className="font-semibold ">Created At:</p>

            <p> {createdUpdatedText}</p>
          </div>

          <div className="flex space-x-4">
            <div className="relative flex flex-col items-center group">
              <button
                onClick={handleEdit}
                className=" border-2 border-blue-600 px-2 py-2 hover:text-white rounded-md  hover:bg-blue-600 active:bg-blue-700"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-sm" />
              </button>
              <div className="absolute bottom-0  flex-col items-center hidden mb-10 group-hover:flex">
                <p className="relative w-20 z-10 p-2 rounded-md text-[10px] leading-none text-gray-600 bg-gray-100 border  ">
                  Edit Note
                </p>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-100 border"></div>
              </div>
            </div>
            <div className="relative flex flex-col items-center group">
              <button
                onClick={handleDelete}
                className=" border-2 border-red-600 px-2 py-2 hover:text-white rounded-md  hover:bg-red-600 active:bg-red-700"
              >
                <FontAwesomeIcon icon={faTrash} className="text-sm" />
              </button>
              <div className="absolute bottom-0  flex-col items-center hidden mb-10 group-hover:flex">
                <p className="relative w-20 z-10 p-2 rounded-md text-[10px] leading-none text-gray-600 bg-gray-100 border  ">
                  Delete Note
                </p>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-100 border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
