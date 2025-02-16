import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IoIosLogIn } from "react-icons/io";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/slice/authSlice";
import Footer from "./Footer.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async (docRef) => {
    const docSnap = await getDoc(docRef);

    dispatch(
      SET_ACTIVE_USER({
        id: docSnap.data().id,
        avatar: docSnap.data().avatar,
        name: docSnap.data().name,
        email: docSnap.data().email,
        password: docSnap.data().password,
        role: docSnap.data().role,
      })
    );

    docSnap.data().role === "basic"
      ? navigate("/dashboard/tasks")
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
    <>
      <div className="header">
        <div className="flex items-center justify-between h-full w-full">
          <img className="h-full mr-1 rounded-2xl" src="/logo.png" alt="" />
          <div className="flex flex-col h-full justify-center">
            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center">
              Hajdú-Bihar Vármegyei Kormányhivatal
            </h1>
            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300  text-center">
              Feladatnyilvántartó Portál
            </h1>
          </div>
        </div>
      </div>
      <div className="main">
        <form className="w-full mt-20">
          <div className="mb-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm border border-gray-300 text-gray-900 bg-transparent text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Add meg az email címet"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm border border-gray-300 text-gray-900 text-xs bg-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Add meg a jelszót"
              required
            />
          </div>

          <div className="flex flex-col mt-10">
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
          </div>
        </form>
      </div>
      <Footer />
    </>

    /*     <div className="container flex flex-col items-center justify-start gap-20 sm:mx-auto md:mx-auto sm:w-[1024px] md:w-[1024px] mt-5 h-screen dark:bg-gray-800 ">
      <div className="w-40 h-40">
        <img className="h-full w-full rounded-2xl" src="logo.png" alt="logo" />
      </div>
      <div className="w-full px-8 sm:w-96 md:w-96">
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300 text-center mt-2 mb-7">
          Hajdú-Bihar Vármegyei Kormányhivatal
        </h1>
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300 text-center mb-7">
          Feladatnyilvántartó Portál
        </h1>
      </div>

      <form className="w-full px-8 sm:w-96 md:w-96">
        <div className="mb-5">
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm border border-gray-300 text-gray-900 text-xs bg-transparent rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg a jelszót"
            required
          />
        </div>

        <div className="flex flex-col mt-10">
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
        </div>
      </form>
    </div> */
  );
};

export default Login;
