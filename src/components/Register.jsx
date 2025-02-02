import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, query, onSnapshot, doc, setDoc } from "firebase/firestore";
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
      const newUserRef = doc(collection(db, "users"));

      setDoc(newUserRef, {
        id: newUserRef.id,
        name: name,
        email: email,
        password: hashedPassword,
        role: "basic",
        createdAt: new Date().toLocaleDateString(),
      });

      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          //const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: newUserRef.id,
          });
        }
      );
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

      <form className="w-full px-8 mt-10 bg-transparent">
        <div className="mb-5">
          <label className="block mb-2 text-xs font-medium text-gray-700 dark:text-white">
            Név
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Név"
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
            className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Email"
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
            className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Jelszó"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Jelszó újra"
          />
        </div>
        <div className="mb-5 text-justify">
          <span className="text-xs text-red-500">
            Legalább 8 karakter hosszú és tartalmaznia kell egy nagybetűt,
            kisbetűt, számot és speciális karaktert.
          </span>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            type="submit"
            onClick={signUp}
            className=" text-xs bg-transparent dark:hover:bg-gray-700 dark:text-white text-gray-700 font-bold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Elküld
          </button>
          <Link
            className=" text-xs bg-transparent dark:hover:bg-gray-700 dark:text-white text-gray-700 font-bold py-2 px-4 border border-gray-400 rounded shadow"
            to={"/"}
          >
            Vissza
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
