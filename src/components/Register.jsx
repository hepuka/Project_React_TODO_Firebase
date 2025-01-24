import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";
import bcrypt from "bcryptjs";

const Register = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const salt = bcrypt.genSaltSync(10);

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-]).{8,}$/;
    return passwordRegex.test(password);
  }

  const signUp = (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (
      password === password2 &&
      validatePassword(password) &&
      emailRegex.test(email) &&
      users.filter((user) => user.email === email).length === 0
    ) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
          });
        }
      );

      addDoc(collection(db, "users"), {
        name: name,
        email: email,
        password: hashedPassword,
        createdAt: Timestamp.now().toDate(),
      });

      navigate("/");
    } else {
      alert(
        "Hibás adatot adott meg vagy ezzel az email címmel már regisztráltak!"
      );
    }
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
            Név
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add meg az neved"
            required
          />
        </div>
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
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Jelszó
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Add meg a jelszót"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Add meg a jelszót újra"
          />
        </div>
        <div className="mb-5 text-justify">
          <span className="text-xs text-red-500">
            Legalább 8 karakter hosszú és tartalmaznia kell egy nagybetűt,
            kisbetűt, számot és speciális karaktert.
          </span>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            type="submit"
            onClick={signUp}
            className="text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Elküld
          </button>
          <Link className="text-gray-700 text-xs" to={"/"}>
            Vissza
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
