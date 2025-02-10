import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import Navbar from "../components/Navbar";
import { selectName } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const [todonumber, setTodonumber] = useState(0);
  const [completednumber, setCompletednumber] = useState(0);
  const [notesnumber, setNotesnumber] = useState(0);
  const userName = useSelector(selectName);

  useEffect(() => {
    const todonumbers = collection(db, "todo");
    const todonumbersq = query(
      todonumbers,
      where("author", "==", `${userName}`)
    );
    const completednumbers = collection(db, "completed");
    const completednumbersq = query(
      completednumbers,
      where("author", "==", `${userName}`)
    );
    const notesnumbers = collection(db, "notes");
    const notesnumbersq = query(
      notesnumbers,
      where("author", "==", `${userName}`)
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
  }, [location, userName]);

  return (
    <div className=" h-screen px-4 py-4">
      <div className="flex justify-center items-start sm:justify-around md:justify-around w-full h-20 mt-1 mb-3">
        <img className="h-full rounded-2xl" src="/logo.png" alt="" />
        <div className="flex flex-col h-full justify-between">
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center">
            Hajdú-Bihar Vármegyei Kormányhivatal
          </h1>
          <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300  text-center">
            Feladatnyilvántartó Portál
          </h1>
        </div>
      </div>
      <div className=" flex w-full h-2/3 mt-4 mb-4 md:justify-center sm:justify-center items-start overflow-x-scroll no-scrollbar">
        <Outlet />
      </div>
      <Navbar
        todonumber={todonumber}
        completednumber={completednumber}
        notesnumber={notesnumber}
      />
    </div>
  );
};

export default Dashboard;
