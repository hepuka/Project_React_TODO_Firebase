import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { adminmenu } from "../db.js";
import HeaderAdmin from "./HeaderAdmin.jsx";

const Main = () => {
  const location = useLocation();

  return (
    <>
      <HeaderAdmin />
      <div className="main-admin">
        <div
          className="flex flex-wrap
         items-start justify-between gap-3 w-full h-full mt-10"
        >
          {location.pathname === "/main" ? (
            <>
              {adminmenu.map((item) => (
                <Link to={item.route} key={item.name}>
                  <div className="flex items-center justify-center w-56 h-56 rounded shadow border border-gray-800  dark:border-gray-300">
                    <p className="text-l text-center px-2">{item.name}</p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;

/* 
felhasználóknál jelezni a folyamatbanb lévő és a lezárt feladatokat
felhasználóknáél role módosítási lehetőség
kilistázni az összes feladatot és a megoldott feladatokat
elfelejtett jelszó kiküldése


*/
