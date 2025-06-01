import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, query, onSnapshot, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";
import bcrypt from "bcryptjs";
import { AvatarGenerator } from "random-avatar-generator";

const Register = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const emailRegex = /^[^@]+@([\w-]+\.)+[\w-]{2,4}$/;
  const salt = bcrypt.genSaltSync(10);
  const generator = new AvatarGenerator();
  const useravatar = generator.generateRandomAvatar();
  const [user, setUser] = useState();

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
    return passwordRegex.test(user.password);
  }

  const signUp = (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    if (
      user.password === user.password2 &&
      validatePassword(user.password) &&
      emailRegex.test(user.email) &&
      users.filter((item) => item.email === user.email).length === 0
    ) {
      const newUserRef = doc(collection(db, "users"));

      setDoc(newUserRef, {
        id: newUserRef.id,
        avatar: useravatar,
        name: user.name,
        jobname: user?.jobname || "",
        bdate: user?.bdate || "",
        bplace: user?.bplace || "",
        mobilephone: user?.mobilephone || "",
        phone: user?.phone || "",
        room: user?.room || "",
        update: new Date().toLocaleDateString(),
        email: user.email,
        password: hashedPassword,
        role: user?.role,
        createdAt: new Date().toLocaleDateString(),
      });

      createUserWithEmailAndPassword(auth, user.email, user.password).then(
        (userCredential) => {
          //const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: user.name,
            photoURL: newUserRef.id,
          });
        }
      );
      navigate("/main");
    } else {
      alert(
        "Hibás adatot adott meg vagy ezzel az email címmel már regisztráltak!"
      );
    }
  };

  return (
    <>
      <div className="w-full mx-auto flex gap-10">
        <div className="flex flex-col justify-start items-start w-2/4">
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Név</p>
            <input
              className="inputstyle"
              type="text"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Email</p>
            <input
              className="inputstyle"
              type="text"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Jelszó</p>
            <input
              className="inputstyle"
              type="password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-5 text-justify">
            <span className="text-xs text-red-500">
              Legalább 8 karakter hosszú és tartalmaznia kell egy nagybetűt,
              kisbetűt, számot és speciális karaktert.
            </span>
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Jelszó újra</p>
            <input
              className="inputstyle"
              type="password"
              value={user?.password2}
              onChange={(e) => setUser({ ...user, password2: e.target.value })}
              required
            />
          </div>

          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Munkakör</p>
            <input
              className="inputstyle"
              type="text"
              value={user?.jobname}
              onChange={(e) => setUser({ ...user, jobname: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-2/4">
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Születési idő</p>
            <input
              className="inputstyle"
              type="date"
              value={user?.bdate}
              onChange={(e) => setUser({ ...user, bdate: e.target.value })}
            />
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Születési hely</p>
            <input
              className="inputstyle"
              type="text"
              value={user?.bplace}
              onChange={(e) => setUser({ ...user, bplace: e.target.value })}
            />
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Szerepkör</p>
            <select
              className="inputstyle"
              value={user?.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="basic">basic</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Mobiltelefon</p>
            <input
              className="inputstyle"
              type="number"
              value={user?.mobilephone}
              onChange={(e) =>
                setUser({ ...user, mobilephone: e.target.value })
              }
            />
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Vezetékes telefon</p>
            <input
              className="inputstyle"
              type="number"
              value={user?.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <div className="flex w-full justify-between h-full items-center mb-5">
            <p className="font-bold w-[200px]">Iroda</p>
            <input
              className="inputstyle"
              type="text"
              value={user?.room}
              onChange={(e) => setUser({ ...user, room: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center h-full items-center">
        <Link onClick={signUp}>
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
    </>
  );
};

export default Register;
