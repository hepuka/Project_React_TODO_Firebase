import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const EditUser = () => {
  let params = useParams();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const emailRegex = /^[^@]+@([\w-]+\.)+[\w-]{2,4}$/;
  const salt = bcrypt.genSaltSync(10);

  useEffect(() => {
    const docRef = doc(db, "users", `${params.id}`);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      setUser(docSnap.data());
    };

    getData();
  }, [params]);

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-]).{8,}$/;
    return passwordRegex.test(password);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", params.id), {
      name: user.name,
      jobname: user.jobname,
      bdate: user.bdate,
      bplace: user.bplace,
      email: user.email,
      role: user.role,
      password: user.password,
      mobilephone: user.mobilephone,
      phone: user.phone,
      room: user.room,
      update: new Date().toLocaleDateString(),
    });
    alert("Sikeres módosítás!");
    navigate("/main/users");
  };

  return (
    <div className="w-[500px] mx-auto">
      <div className="flex w-full justify-between h-full items-center mb-5">
        <p className="font-bold w-[200px]">Név</p>
        <input
          className="inputstyle"
          type="text"
          value={user?.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="flex w-full justify-between h-full items-center mb-5">
        <p className="font-bold w-[200px]">Munkakör</p>
        <input
          className="inputstyle"
          type="text"
          value={user?.jobname || user?.jobname}
          onChange={(e) => setUser({ ...user, jobname: e.target.value })}
        />
      </div>
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
        <p className="font-bold w-[200px]">Email</p>
        <input
          className="inputstyle"
          type="text"
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          onChange={(e) => setUser({ ...user, mobilephone: e.target.value })}
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
      <div className="flex w-full justify-center gap-10 h-full items-center">
        <Link onClick={handleEdit}>
          <div className=" mt-10 w-[100px] text-sm text-center bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
            Mentés
          </div>
        </Link>
        <Link to="/main/users">
          <div className=" mt-10 w-[100px] text-sm text-center bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
            Vissza
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EditUser;
