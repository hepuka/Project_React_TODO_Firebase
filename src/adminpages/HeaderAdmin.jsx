import React from "react";
import { useSelector } from "react-redux";
import { selectName, selectEmail } from "../redux/slice/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
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
    <div className="header-admin">
      <div className=" flex items-center justify-between w-full h-28">
        <img className="h-full" src="logo.png" alt="logo" />
        <div className="text-center h-full flex flex-col justify-around items-center">
          <h1 className="text-3xl mb-2">
            Hajdú-Bihar Vármegyei Kormányhivatal
          </h1>
          <h2 className="text-2xl">Feladatnyilvántartó Portál</h2>
          <h3 className="text-xl">ADMIN PORTÁL</h3>
        </div>
        <div className=" flex flex-col h-full items-start justify-start gap-1">
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{new Date().toLocaleDateString()}</p>
          <p className="text-bold cursor-pointer text-red-600" onClick={LogOut}>
            Kijelentkezés
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
