import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";

import { tabs } from "../db";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center h-screen px-4 py-4">
      <div className="flex justify-center w-full h-32 mt-1 mb-3 border-b border-gray-700">
        <img className="h-full" src="/cimer.png" alt="" />
      </div>
      <div className="flex justify-items-start shrink-0 gap-4 w-full h-11 overflow-x-scroll no-scrollbar">
        {tabs.map((tab) => (
          <Link className="links" to={tab.path} key={tab.name}>
            {tab.name}
          </Link>
        ))}
      </div>
      <div className="w-full h-2/3 mt-4 overflow-x-scroll no-scrollbar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
