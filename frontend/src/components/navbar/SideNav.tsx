import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/hook";
import { toggleSideNav } from "../../store/slice/navSlice";
const SideNav: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="md:hidden lg:hidden">
      <aside
        id="default-sidebar"
        className="fixed top-0 right-0 z-40 w-64 h-screen transition-transform "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-800">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <img
                src="https://freesvg.org/img/notas.png"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                My Notes
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              onClick={() => dispatch(toggleSideNav([]))}
              className="inline-flex items-center p-2 ml-3 text-sm  rounded-lg border border-white text-white hover:bg-gray-700 focus:ring-gray-600 active:scale-110"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faXmark} className="scale-125" />
            </button>
          </div>
          <hr className="h-px my-4 bborder-0 bg-gray-700"></hr>
          <ul className="space-y-4 font-medium ">
            <li>
              <a
                href="#/"
                className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                <span className="ml-3">Sign in</span>
              </a>
            </li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 =rounded-lg text-white  hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="ml-3">Sign out</span>
              </a>
            </li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="ml-3">Sign out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
