import "./LandingPage.css";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.js";

import {loginService , getCurrentUser , logoutService , } from "../../services/userService.jsx";

import { replace , useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const LandingPage = () => {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result);

        const token = await result.user.getIdToken();
        console.log(token)

        const data = await loginService(token);
        console.log(data);
        await getCurrentUser();

        toast.success("Login Successful!");

        navigate("/home", { replace: true });
      } 
      catch (error) {
        console.log(error);
        toast.error(error.message || "Login Failed");
      }
  };

  return (
    <div className="landing">

      <div className="landing-box">

                <h1>AI Chat</h1>

                <p>Chat with your AI assistant.</p>

                <button onClick={handleGoogleLogin}>Continue with Google</button>

      </div>

    </div>
  );
};

export default LandingPage;