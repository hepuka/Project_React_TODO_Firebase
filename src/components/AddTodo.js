import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { selectName } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const userName = useSelector(selectName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && desc !== "" && department !== "") {
      await addDoc(collection(db, "todo"), {
        author: userName,
        title: title,
        desc: desc,
        department: department,
        date: new Date().toLocaleDateString(),
        completed: false,
      });

      setTitle("");
      setDesc("");
      setDepartment("");

      navigate("/dashboard/tasks");
    } else {
      alert("Minden mező kitöltése kötelező!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-6 items-center justify-center gap-3 w-full pr-1 pl-1"
    >
      <input
        type="text"
        className="block p-2.5 w-full h-10 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladat neve"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        className="block p-2.5 w-full  text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Add meg a feladat leírását..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="block p-2.5 w-full h-10 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
      >
        <option value="">--Osztály--</option>
        <option value="Agrár">Agrár</option>
        <option value="Agrár-ELBAO">Agrár-ELBAO</option>
        <option value="Agrár-FMO">Agrár-FMO</option>
        <option value="Agrár-NTO">Agrár-NTO</option>
        <option value="Agrár-VSZFO">Agrár-VSZFO</option>
        <option value="Agrár-LABOR">Agrár-LABOR</option>
        <option value="Katvéd">Katvéd</option>
        <option value="Katvéd-TŰZIPARB">Katvéd-TŰZIPARB</option>
        <option value="Katvéd-VÍZÜGY">Katvéd-VÍZÜGY</option>
        <option value="Piac54">Piac 54.</option>
      </select>

      <button className=" mt-5 w-full text-xs bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
        Hozzáad
      </button>
    </form>
  );
}
