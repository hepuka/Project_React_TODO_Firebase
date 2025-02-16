import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IoIosLogIn } from "react-icons/io";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/slice/authSlice";

const LoginForm = () => {
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
    <form className="w-full mt-20">
      <div className="mb-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputstyle"
          placeholder="Add meg az email címet"
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow-sm border border-gray-300 text-sm bg-transparent rounded-lg block w-full p-2.5 dark:bg-transparent dark:border-gray-600  dark:shadow-sm-light"
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
  );
};

export default LoginForm;
