import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import bcrypt from "bcryptjs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Repassword = () => {
  const [newpassword, setNewpassword] = useState("");
  const [newagainpassword, setNewagainpassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);
  const [users, setUsers] = useState();

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArray);
    });
    return () => unsub();
  }, []);

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-]).{8,}$/;
    return passwordRegex.test(password);
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(newpassword, salt);

    /*     if (newpassword.length === 0 || newagainpassword.length === 0) {
      return alert("Minden mező kitöltése kötelező!");
    }

    if (!validatePassword(newpassword)) {
      return alert("Nem megfelelő jelszó!");
    } */

    try {
      /*       if (newpassword !== newagainpassword) {
        return alert("Hibás régi jelszó vagy az új jelszavak nem egyeznek!");
      } */
      /*       await updatePassword(selectedUser, newpassword);

      const userDocRef = doc(db, "users", selectedUser);
      await updateDoc(userDocRef, {
        password: hashedPassword,
      });

      alert("Sikeres jelszómódosítás!");
      navigate("/menu"); */
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-3  mx-auto">
      <select
        className="inputstyle"
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Felhasználó</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            Név: {user.name} - szerepkör: {user.role} - email: {user.email}
          </option>
        ))}
      </select>

      <form className="flex flex-col items-center justify-center gap-10 w-full pr-1 pl-1 mt-5">
        <input
          type="password"
          className="block p-2.5 w-full h-10 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Új jelszó"
          value={newpassword}
          onChange={(e) => setNewpassword(e.target.value)}
        />
        <input
          type="password"
          className="block p-2.5 w-full h-10 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Új jelszó ismét"
          value={newagainpassword}
          onChange={(e) => setNewagainpassword(e.target.value)}
        />
        <div className=" text-justify">
          <span className="text-xs text-red-500">
            Legalább 8 karakter hosszú és tartalmaznia kell egy nagybetűt,
            kisbetűt, számot és speciális karaktert.
          </span>
        </div>
      </form>
      <div className="flex w-full justify-center gap-10 h-full items-center">
        <Link onClick={handleUpdatePassword}>
          <div className=" mt-10 w-[100px] text-sm text-center bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
            Mentés
          </div>
        </Link>
        <Link to="/main">
          <div className=" mt-10 w-[100px] text-sm text-center bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
            Vissza
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Repassword;
