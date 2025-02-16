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
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER } from "../redux/slice/authSlice";
import { selectName, selectAvatar } from "../redux/slice/authSlice";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(selectName);
  const userAvatar = useSelector(selectAvatar);
  const LogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");

        dispatch(REMOVE_ACTIVE_USER());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col items-start w-full h-20 mt-1 mb-3">
      <div className=" flex h-full mb-10 mt-3 shadow-lg rounded-lg px-2 py-4 w-full dark:border dark:border-gray-500">
        <img className="h-full" src={userAvatar} alt="avatar" />
        <div className="flex flex-col ml-4 h-full justify-center gap-2">
          <p className="text-sm">{userName}</p>
          <p className="text-sm">Informatikai Osztály</p>
        </div>
      </div>

      <div className="flex w-full mb-5 gap-3">
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 shadow-lg rounded-lg dark:border dark:border-gray-500"
          to="/dashboard/menu/newpassword"
        >
          <BiReset />
          <p className="text-sm">Jelszómódosítás</p>
        </Link>

        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-lg dark:border dark:border-gray-500"
          to="/dashboard/menu/statistics"
        >
          <FcStatistics />
          <p className="text-sm">Statisztika</p>
        </Link>
      </div>
      <div className="flex w-full  mb-5 gap-3">
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-lg dark:border dark:border-gray-500"
          to="/dashboard/menu/details"
        >
          <MdPersonalInjury />
          <p className="text-sm">Személyes adatok</p>
        </Link>
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-lg dark:border dark:border-gray-500"
          to="/dashboard/menu/feedback"
        >
          <FaRocketchat />
          <p className="text-sm">Visszajelzés</p>
        </Link>
      </div>
      <div className="flex w-full  mb-5 gap-3">
        <Link
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-lg dark:border dark:border-gray-500"
          to="/dashboard/menu/gyik"
        >
          <FaQrcode />
          <p className="text-sm">GYIK</p>
        </Link>
        <Link
          type="submit"
          onClick={LogOut}
          className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-lg dark:border dark:border-gray-500"
          to="/dashboard/menu/gyik"
        >
          <FaSignOutAlt />
          <p className="text-sm text-red-500">Kijelentkezés</p>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
