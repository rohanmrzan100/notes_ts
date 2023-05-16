import React, {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/Users";
import { errorToast, successToast } from "../HOC/Toast";
import { useAppDispatch,useAppSelector } from "../../store/hook";
import { login } from "../../store/slice/authSlice";
interface loginInput {
  email: string;
  password: string;
}
const Signin: React.FC = () => {
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data: loginInput = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    loginUser(data)
      .then((res) => {
        console.log(res);
        dispatch(login({
          type:"success",
          token:res.token
        }))
        successToast("login Successful");
        navigate("/")
      })
      .catch((error) => {
        setError(true);
        setErrorMsg(error.response.data.msg);
        console.log(error);
        errorToast(error.response.data.msg);
      });
  };

  return (
    <>
      <div className=" p-4">
        <div className="w-10/12 p-6 m-auto bg-white border border-gray-600 rounded-md shadow-md md:max-w-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 ">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
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
            {/* {<p className="mb-4 text-red-700 font-semibold">Email Not found</p>} */}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
              
                  onChange={() => setError(false)}
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
            {error && (
              <p className="mb-4 text-red-700 font-semibold">{errorMsg}</p>
            )}
            {/* <a href="#/" className="text-xs  text-indigo-600 hover:underline">
              Forget Password?
            </a> */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none active:bg-indigo-500 focus:bg-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/auth/signup")}
              className="font-medium  text-indigo-600 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
