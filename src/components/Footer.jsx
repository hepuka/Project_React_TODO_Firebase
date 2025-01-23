import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const savedUserData = JSON.parse(localStorage.getItem("userData"));
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const LogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-2 py-2 text-gray-700">
      <button
        type="submit"
        onClick={LogOut}
        className="text-red-600 font-bold focus:ring-4 focus:outline-none rounded-lg text-m px-5 py-3 text-center"
      >
        Kijelentkezés
      </button>

      <p className="text-sm mb-1">Belépve: {savedUserData.displayName}</p>
      <p className="text-sm mb-1">
        Készítette: Kun-Fagyal Zoltán &copy; {year}
      </p>
      <p className="text-sm">Minden jog fenntartva!</p>
    </div>
  );
};

export default Footer;
