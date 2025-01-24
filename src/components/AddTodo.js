import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const savedUserData = JSON.parse(localStorage.getItem("userData"));

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && desc !== "" && department !== "") {
      await addDoc(collection(db, "todos"), {
        author: savedUserData.displayName,
        title: title,
        desc: desc,
        department: department,
        date: new Date().toLocaleDateString(),
        completed: false,
      });

      setTitle("");
      setDesc("");
      setDepartment("");

      navigate("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-6 items-center justify-center gap-8 w-full"
    >
      <input
        type="text"
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladat neve"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        className="block p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Add meg a feladat leírását..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <select
        value={department}
        onChange={handleChange}
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
      >
        <option value="">--Osztály--</option>
        <option value="Agrár-ELBAO">Agrár-ELBAO</option>
        <option value="Agrár-FMO">Agrár-FMO</option>
        <option value="Agrár-NTO">Agrár-NTO</option>
        <option value="Agrár-VSZFO">Agrár-VSZFO</option>
        <option value="Agrár-LABOR">Agrár-LABOR</option>
        <option value="Katvéd-TŰZIPARB">Katvéd-TŰZIPARB</option>
        <option value="Katvéd-VÍZÜGY">Katvéd-VÍZÜGY</option>
        <option value="Piac54">Piac 54.</option>
      </select>
      <button className="text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Hozzáad
      </button>
    </form>
  );
}
