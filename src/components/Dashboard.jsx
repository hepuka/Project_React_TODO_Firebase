import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GET_NUMBERS } from "../redux/slice/getNumbers";
import Header from "./Header";
const Dashboard = () => {
  const location = useLocation();
  const userName = useSelector(selectName);
  const dispatch = useDispatch();

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

      dispatch(
        GET_NUMBERS({
          todonumbers: snapshot.data().count,
          completednumbers: snapshot2.data().count,
          notesnumbers: snapshot3.data().count,
        })
      );
    };
    getCounts();
  }, [location, userName]);

  return (
    <>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
};

export default Dashboard;
