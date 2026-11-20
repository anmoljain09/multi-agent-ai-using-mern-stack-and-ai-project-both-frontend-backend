/*

import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {loginService , getCurrentUser , logoutService , } from "../../services/userService.jsx";


const HomePage = () => {
  const navigate = useNavigate();

  // Replace later with API data
  const user = {
    id: "USR001",
    name: "Rohit Kumar",
    email: "rohit@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const handleLogout = async () => {
      try {
        
        await logoutService(); // --> session cookie read --> redis session delete --> cookie remove --> "Logout Successful"

        await signOut(auth);  // --> Firebase se logout

        navigate("/");    // --> Login page par bhej do
      } 
      catch (error) {
        console.error("Logout Error:", error);
      }
  };

  return (
    <div className="home">
      <div className="home-card">

                <h1 className="title">AI Chat</h1>

                <img src={user.avatar} alt="Avatar" className="avatar"/>

                <h2 className="name">{user.name}</h2>

                <p className="email">{user.email}</p>

                <div className="buttons">
                  <button className="start-btn" onClick={() => navigate("/chat")}>🚀 Start Chat</button>

                  <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
                </div>

      </div>
    </div>
  );
};

export default HomePage;

*/

/*

cookie aur firebase me se delete hone se logout kaise ?

1. Firebase

Firebase yaad rakhta hai ki

Ye Google user login hai.

Isliye agar tum

auth.currentUser

likhoge to user mil jayega.


2. Browser Cookie

Backend browser me ek cookie bhej deta hai.

Example

session=ab12cd34

Browser is cookie ko automatically har request ke saath bhejta hai.

GET /chat

Cookie:
session=ab12cd34

Backend cookie dekhkar bolta hai

Haan ye wahi login user hai.

Redis se session delete kar deti hai.

Pehle

Redis

session-ab12cd34

Logout ke baad

Redis

Nothing

Ab agar browser wahi cookie bhejega

session=ab12cd34

Backend bolega

Redis me session hi nahi mili.

Unauthorized

Matlab login khatam.


Browser se cookie hata deti hai.

Pehle

Browser

session=ab12cd34

Logout ke baad

Browser

No Cookie

Ab browser request bhejega

GET /chat

Lekin

Cookie

Nothing

Backend ko pata hi nahi chalega kaun user hai.

Isliye access nahi milega.


Firebase logout kyu?

Google login Firebase ke through hua tha.

Firebase ke paas abhi bhi user saved hai.

auth.currentUser

abhi bhi user return karega.

Agar tum sirf cookie delete kar do aur

signOut(auth)

na karo,

to Firebase bolega

User abhi bhi login hai.

Google popup khulte hi turant login kara dega.

*/




import "./HomePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {getCurrentUser , logoutService , } from "../../services/userService.jsx";

import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
          try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } 
          catch (error) {
            console.error(error);
            toast.error("Please login first");
            navigate("/", { replace: true });
          } 
          finally {
            setLoading(false);
          }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
        try {
          await logoutService();
          await signOut(auth);

          toast.success("Logout Successful");
          navigate("/", { replace: true });
        } 
        catch (error) {
          console.error("Logout Error:", error);

          toast.error(error.message || "Logout Failed");
        }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="home">
      <div className="home-card">
                    <h1 className="title">AI Chat</h1>

                    <img src={user?.avatar || "/default-avatar.png"} alt="Avatar" className="avatar" />

                    <h2 className="name">{user?.username}</h2>

                    <p className="email">{user?.email}</p>

        <div className="buttons">
                    <button className="start-btn" onClick={() => navigate("/chat")}>🚀 Start Chat </button>

                    <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;