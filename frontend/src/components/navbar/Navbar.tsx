import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { toggleSideNav } from "../../store/slice/navSlice";
import { logout } from "../../store/slice/authSlice";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
const isAuth = useAppSelector(state=>state.auth.isAuth)
  const dispatch = useAppDispatch();
  return (
    <>
      <nav className=" border-gray-200 bg-gray-900 ">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto  px-8 py-4">
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
            className="inline-flex border border-white items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 active:scale-110"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faBars} className="scale-125" />
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex justify-center items-center space-x-2">
              {!isAuth &&
                <>
                  <li>
                    <button
                      onClick={() => navigate("/auth/signin")}
                      className="active:bg-gray-500 flex items-center py-2 px-4  rounded-lg text-white hover:bg-gray-700 "
                    >
                      Sign In
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => navigate("/auth/signup")}
                      className="active:bg-gray-500 flex items-center py-2 px-4  rounded-lg text-white hover:bg-gray-700 "
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              }
              {isAuth && (
                <li>
                  <button
                    onClick={() => {
                      dispatch(logout([]));
                      navigate("/auth/signin");
                    }}
                    className="active:bg-gray-500 flex items-center py-2 px-4  rounded-lg text-white hover:bg-gray-700 "
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
