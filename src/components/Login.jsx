import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getCurrentUser = async (docRef) => {
    const docSnap = await getDoc(docRef);
    localStorage.setItem("currentuser", JSON.stringify(docSnap.data()));
    navigate("/dashboard");
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userData", JSON.stringify(user));

        const docRef = doc(db, "users", `${user.photoURL}`);

        getCurrentUser(docRef);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-5 h-screen gap-3">
      <div className="w-40 h-40">
        <img className="h-full w-full" src="/Logo.png" alt="logo" />
      </div>

      <h1 className="text-xl font-bold text-gray-700  text-center mt-2">
        Hajdú-Bihar Vármegyei Kormányhivatal
      </h1>
      <h1 className="text-l font-bold text-gray-700  text-center mb-7">
        Feladatnyilvántartó Portál
      </h1>

      <form className="w-full max-w-sm px-8">
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg az email címet"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-xs text-gray-700 dark:text-white">
            Jelszó
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            type="submit"
            onClick={signIn}
            className="text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Belépés
          </button>
          <Link className="text-gray-700 text-xs font-bold" to={"/register"}>
            Regisztráció
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
