import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import bcrypt from "bcryptjs";
import { SET_NEW_PASSWORD } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
const Newpassword = () => {
  const [newpassword, setNewpassword] = useState("");
  const [newagainpassword, setNewagainpassword] = useState("");
  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);
  const dispatch = useDispatch();
  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-]).{8,}$/;
    return passwordRegex.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(newpassword, salt);

    if (newpassword.length === 0 || newagainpassword.length === 0) {
      return alert("Minden mező kitöltése kötelező!");
    }

    if (!validatePassword(newpassword)) {
      return alert("Nem megfelelő jelszó!");
    }

    try {
      if (newpassword !== newagainpassword) {
        return alert("Hibás régi jelszó vagy az új jelszavak nem egyeznek!");
      }

      await updatePassword(auth.currentUser, newpassword);

      const userDocRef = doc(db, "users", auth.currentUser.photoURL);
      await updateDoc(userDocRef, {
        password: hashedPassword,
      });

      dispatch(
        SET_NEW_PASSWORD({
          password: hashedPassword,
        })
      );

      alert("Sikeres jelszómódosítás!");
      navigate("/dashboard/menu");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <h1 className="mt-5">Jelszómódosítás</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-3 w-full pr-1 pl-1"
      >
        <input
          type="password"
          className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Új jelszó"
          value={newpassword}
          onChange={(e) => setNewpassword(e.target.value)}
        />
        <input
          type="password"
          className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Új jelszó ismét"
          value={newagainpassword}
          onChange={(e) => setNewagainpassword(e.target.value)}
        />
        <div className="mb-5 text-justify">
          <span className="text-xs  text-red-500">
            Legalább 8 karakter hosszú és tartalmaznia kell egy nagybetűt,
            kisbetűt, számot és speciális karaktert.
          </span>
        </div>

        <button className="mt-5 w-full text-xs bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
          Módosít
        </button>
      </form>
    </div>
  );
};

export default Newpassword;
