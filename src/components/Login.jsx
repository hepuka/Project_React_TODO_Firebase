import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "./Footer";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineAppRegistration } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getCurrentUser = async (docRef) => {
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data().role);
    localStorage.setItem("currentuser", JSON.stringify(docSnap.data()));

    docSnap.data().role === "basic"
      ? navigate("/dashboard")
      : navigate("/main");
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", `${user.photoURL}`);

        getCurrentUser(docRef);
      })
      .catch((error) => {
        alert("Hibás bejelentkezési adat!");
      });
  };

  return (
    <div className="container flex flex-col items-center sm:mx-auto md:mx-auto sm:w-[1200px] md:w-[1200px] justify-around sm:justify-center md:justify-center sm:gap-10 md:gap-10 mt-5 gap-3 h-screen dark:bg-gray-800 ">
      <div className="w-40 h-40">
        <img className="h-full w-full rounded-2xl" src="logo.png" alt="logo" />
      </div>
      <div className="w-full px-8 sm:w-96 md:w-96">
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300  text-center mt-2 mb-7">
          Hajdú-Bihar Vármegyei Kormányhivatal
        </h1>
        <h1 className="text-l font-bold text-gray-700 dark:text-gray-300  text-center mb-7">
          Feladatnyilvántartó Portál
        </h1>
      </div>

      <form className="w-full px-8 sm:w-96 md:w-96">
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-gray-300 ">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm  border border-gray-300 text-gray-900 bg-transparent text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg az email címet"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-xs text-gray-700 dark:text-gray-300 ">
            Jelszó
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm border border-gray-300 text-gray-900 text-xs bg-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg a jelszót"
            required
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center">
          <button
            type="submit"
            onClick={signIn}
            className=" flex justify-center items-center text-xs bg-transparent dark:hover:bg-gray-700 dark:text-gray-300  font-bold py-2 px-4 mb-4 border border-gray-400 rounded shadow"
          >
            <span className="mr-2">
              <IoIosLogIn />
            </span>
            <div>Belépés</div>
          </button>

          <p className="text-xs ">
            Nincs még fiókja?{" "}
            <span className="text-blue-500 text-bold">
              <Link to="/register">Regisztráció</Link>
            </span>
          </p>

          {/*           <Link
            className="flex justify-center items-center text-xs bg-transparent dark:hover:bg-gray-700 dark:text-gray-300  font-bold py-2 px-4 border border-gray-400 rounded shadow"
            to={"/register"}
          >
            <span className="mr-2">
              <MdOutlineAppRegistration />
            </span>
            <div>Regisztráció</div>
          </Link> */}
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Login;
