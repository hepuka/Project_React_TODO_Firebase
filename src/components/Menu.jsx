import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FaSignOutAlt } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import { FcStatistics } from "react-icons/fc";
import { MdPersonalInjury } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";

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
    <div className="flex flex-col items-start sm:justify-around md:justify-around w-full h-20 mt-1 mb-3">
      <div className=" flex h-full mb-10 mt-3 rounded-lg px-2 py-4 w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500">
        <img className="h-full" src={currentUserData.avatar} alt="avatar" />
        <div className="flex flex-col ml-4 h-full justify-center gap-2">
          <p className="text-sm">{currentUserData.name}</p>
          <p className="text-sm">Informatikai Osztály</p>
        </div>
      </div>

      <div className="flex w-full mb-5 gap-3">
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500"
          to="/dashboard/menu/newpassword"
        >
          <BiReset />
          <p className="text-sm">Jelszómódosítás</p>
        </Link>

        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500"
          to="/dashboard/menu/statistics"
        >
          <FcStatistics />
          <p className="text-sm">Statisztika</p>
        </Link>
      </div>
      <div className="flex w-full  mb-5 gap-3">
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500"
          to="/dashboard/menu/details"
        >
          <MdPersonalInjury />
          <p className="text-sm">Személyes adatok</p>
        </Link>
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500"
          to="/dashboard/menu/feedback"
        >
          <FaRocketchat />
          <p className="text-sm">Visszajelzés</p>
        </Link>
      </div>
      <div className="flex w-full  mb-5 gap-3">
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500"
          to="/dashboard/menu/gyik"
        >
          <FaQrcode />
          <p className="text-sm">GYIK</p>
        </Link>
      </div>

      <button
        type="submit"
        onClick={LogOut}
        className=" flex w-full justify-center items-center text-xs bg-transparent dark:hover:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-500  font-bold px-4 py-3 mb-10 mt-10 border border-gray-400 rounded shadow"
      >
        <span className="mr-2">
          <FaSignOutAlt />
        </span>
        <div>Kijelentkezés</div>
      </button>

      <Footer />
    </div>
  );
};

export default Menu;
