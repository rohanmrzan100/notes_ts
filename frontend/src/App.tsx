import React from "react";
import Landing from "./components/notePage/landing";
import Navbar from "./components/navbar/Navbar";
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
          </Routes>
     <ToastContainer/>
      </BrowserRouter>
    </>
  );
};

export default App;
