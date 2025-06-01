import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

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

  const handleRowClick = (id) => {
    navigate(`/main/users/${id}`);
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="text-left h-[30px]">
            <th>Név</th>
            <th>Munkakör</th>
            <th>Email</th>
            <th>Mobiltelefon</th>
            <th>Vezetékes telefon</th>
            <th>Iroda</th>
            <th>Szerepkör</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user.id}
              className="text-left h-[40px] hover:cursor-pointer"
              onClick={() => handleRowClick(user.id)}
            >
              <td>{user.name}</td>
              <td>{user.jobname}</td>
              <td>{user.email}</td>
              <td>{user.mobilephone}</td>
              <td>{user.phone}</td>
              <td>{user.room}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/main">
        <div className=" mt-5 w-[100px] text-sm text-center bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
          Vissza
        </div>
      </Link>
    </>
  );
};

export default Users;
