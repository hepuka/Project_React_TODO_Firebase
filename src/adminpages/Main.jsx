import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName, selectEmail } from "../redux/slice/authSlice";
const Main = () => {
  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="flex flex-col gap-3 items-space-between justify-items-start w-[1200px] mx-auto h-screen px-3 mt-3">
      <div className=" flex items-center justify-between w-full h-48">
        <img className="w-40 h-full" src="logo.png" alt="logo" />
        <div className="text-center h-full flex flex-col justify-around items-center">
          <h1 className="text-3xl mb-2">
            Hajdú-Bihar Vármegyei Kormányhivatal
          </h1>
          <h2 className="text-2xl">Feladatnyilvántartó Portál</h2>
          <h3 className="text-xl">ADMIN PORTÁL</h3>
        </div>

        <div className=" flex flex-col h-full items-start justify-start gap-1 py-3">
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{new Date().toLocaleDateString()}</p>
          <p className="text-bold cursor-pointer text-red-600" onClick={LogOut}>
            Kijelentkezés
          </p>
        </div>
      </div>

      <div
        className="flex flex-wrap
       items-start justify-between gap-3 w-full h-full mt-10"
      >
        {location.pathname === "/main" ? (
          <>
            <Link to="/main/users">
              <div className="flex items-center justify-center w-56 h-56 rounded shadow border border-gray-800 dark:border-gray-300">
                <p className="text-l text-center px-2">Felhasználók</p>
              </div>
            </Link>
            <Link to="/main/repassword">
              <div className="flex items-center justify-center w-56 h-56 rounded shadow border border-gray-800  dark:border-gray-300">
                <p className="text-l text-center px-2">Elfelejtett jelszó</p>
              </div>
            </Link>
            <Link to="/main/roles">
              <div className="flex items-center justify-center w-56 h-56 rounded shadow border border-gray-800  dark:border-gray-300">
                <p className="text-l text-center px-2">Jogosultságkezelő</p>
              </div>
            </Link>
            <Link to="/main/inprogress">
              <div className="flex items-center justify-center w-56 h-56 rounded shadow border border-gray-800  dark:border-gray-300">
                <p className="text-l text-center px-2">
                  Folyamatban lévő és lezárt feladatok
                </p>
              </div>
            </Link>
          </>
        ) : (
          <div>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;

/* 
felhasználóknál jelezni a folyamatbanb lévő és a lezárt feladatokat
felhasználóknáél role módosítási lehetőség
kilistázni az összes feladatot és a megoldott feladatokat
elfelejtett jelszó kiküldése


*/
