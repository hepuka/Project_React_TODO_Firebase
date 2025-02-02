import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

const Dashboard = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();
  const location = useLocation();
  const [todonumber, setTodonumber] = useState(0);
  const [completednumber, setCompletednumber] = useState(0);
  const [notesnumber, setNotesnumber] = useState(0);

  useEffect(() => {
    const todonumbers = collection(db, "todo");
    const todonumbersq = query(
      todonumbers,
      where("author", "==", `${currentUserData.name}`)
    );
    const completednumbers = collection(db, "completed");
    const completednumbersq = query(
      completednumbers,
      where("author", "==", `${currentUserData.name}`)
    );
    const notesnumbers = collection(db, "notes");
    const notesnumbersq = query(
      notesnumbers,
      where("author", "==", `${currentUserData.name}`)
    );

    const getCounts = async () => {
      const snapshot = await getCountFromServer(todonumbersq);
      const snapshot2 = await getCountFromServer(completednumbersq);
      const snapshot3 = await getCountFromServer(notesnumbersq);
      setTodonumber(snapshot.data().count);
      setCompletednumber(snapshot2.data().count);
      setNotesnumber(snapshot3.data().count);
    };
    getCounts();
  }, [location]);

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
    <div className="flex flex-col items-center h-screen px-4 py-4">
      <div className="flex justify-between items-start sm:justify-around md:justify-around w-full h-20 mt-1 mb-3">
        <img className="h-full rounded-2xl" src="logo.png" alt="" />
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
      <div className="flex justify-items-start md:justify-center sm:justify-center shrink-0 gap-4 w-full mt-4 h-11 overflow-x-scroll no-scrollbar">
        <Link className="links text-xs" to="/dashboard/add">
          <span className="mr-1">
            <MdAddTask />
          </span>{" "}
          Új feladat
        </Link>
        <Link className="links text-xs" to="/dashboard/tasks">
          <span className="mr-1">
            <FaTasks />
          </span>
          Feladatok
          <span className="ml-1">({todonumber})</span>
        </Link>
        <Link className="links text-xs" to="/dashboard/done">
          <span className="mr-1">
            <IoMdDoneAll />
          </span>
          Teljesített
          <span className="ml-1">({completednumber})</span>
        </Link>
        <Link className="links text-xs" to="/dashboard/ip">
          <span className="mr-1">
            <FaRegNoteSticky />
          </span>
          Jegyzetek
          <span className="ml-1">({notesnumber})</span>
        </Link>
      </div>
      <div className=" flex w-full h-2/3 mt-4 md:justify-center sm:justify-center items-start overflow-x-scroll no-scrollbar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
