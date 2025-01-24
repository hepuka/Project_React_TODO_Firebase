import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { tabs } from "../db";

const Dashboard = () => {
  const savedUserData = JSON.parse(localStorage.getItem("userData"));
  const [date, setDate] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date().toLocaleTimeString());
    }, 1000);
  });

  return (
    <div className="flex flex-col items-center h-screen px-4 py-4">
      <div className="flex justify-between items-start sm:justify-around md:justify-around w-full h-32 mt-1 mb-3 border-b border-gray-700">
        <img className="h-full" src="/cimer.png" alt="" />
        <div>
          <p className="text-sm">{savedUserData.displayName}</p>
          <p className="text-sm mb-3">Informatikai Osztály</p>
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
          <p className="text-sm">{date}</p>
        </div>
      </div>
      <div className="flex justify-items-start md:justify-center sm:justify-center shrink-0 gap-4 w-full h-11 overflow-x-scroll no-scrollbar">
        {tabs.map((tab) => (
          <Link className="links text-xs" to={tab.path} key={tab.name}>
            {tab.name}
          </Link>
        ))}
      </div>
      <div className=" flex w-full h-2/3 mt-4 md:justify-center sm:justify-center items-start overflow-x-scroll no-scrollbar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
