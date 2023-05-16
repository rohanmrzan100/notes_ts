import React from "react";
import Landing from "./components/notePage/landing";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/signup";
import Signin from "./components/auth/signin";
import SideNav from "./components/navbar/SideNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./store/hook";
import { ToastContainer } from "react-toastify";

const App = () => {
  const showNav = useAppSelector((state) => state.nav.toggle);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {showNav && <SideNav />}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
