import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();

  const LogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        localStorage.removeItem("userData");
        localStorage.removeItem("currentuser");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col justify-between items-start sm:justify-around md:justify-around w-full h-20 mt-1 mb-3">
      <div className="flex flex-col gap-2">
        <p className="text-xs">{currentUserData.name}</p>
        <p className="text-xs">Informatikai Osztály</p>
        <p className="text-xs">{new Date().toLocaleDateString()}</p>
        <p
          className="text-xs text-bold text-red-600 cursor-pointer"
          onClick={LogOut}
        >
          Kijelentkezés
        </p>
      </div>
    </div>
  );
};

export default Menu;
