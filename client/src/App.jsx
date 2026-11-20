import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import ChatPage from "./pages/chat/ChatPage.jsx";
import {loginService , getCurrentUser , logoutService , } from "./services/userService.jsx";
import { useEffect } from "react";

import PrivateRoute from "./components/ProtectedRoutes.jsx";
import PublicRoute from "./components/PublicRoutes.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

      // useEffect(() => {
      //   const getUser = async () => {
      //     await getCurrentUser();
      //   };

      //   getUser();
      // }, []);

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />

        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />

        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />

      </Routes>


      <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
      

    </BrowserRouter>

  );

}

export default App;