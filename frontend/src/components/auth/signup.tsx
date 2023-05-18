import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../API/Users";
import { errorToast, successToast } from "../HOC/Toast";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { loading } from "../../store/slice/authSlice";
interface userInput {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      loading({
        type: "true",
      })
    );
    const data: userInput = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    registerUser(data)
      .then((res) => {
        dispatch(loading({ type: "false" }));
        successToast("Registration Sucessful");
        navigate("/auth/signin");
      })
      .catch((err) => {
        dispatch(loading({ type: "false" }));
        console.log(err.response.data.error);
        setError(true);
        setErrorMsg(err.response.data.error);
        errorToast(err.response.data.error);
      });
  };
  return (
    <>
      <div className=" p-4">
        <div className="w-10/12 p-6 m-auto bg-white border border-gray-600 rounded-md shadow-md md:max-w-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 ">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                onChange={() => setError(false)}
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {error && (
              <p className="mb-4 text-red-700 font-semibold">{errorMsg}</p>
            )}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div
                  onClick={() => setShow(!show)}
                  className="absolute right-0 mt-2 mr-3 cursor-pointer"
                >
                  {show ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none active:bg-indigo-500 focus:bg-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/signin")}
              className="font-medium  text-indigo-600 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

    
    </>
  );
};

export default Signup;
