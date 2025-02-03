import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditTodo = () => {
  let params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "todo", `${params.id}`);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      setTitle(docSnap.data().title);
      setDesc(docSnap.data().desc);
      setDepartment(docSnap.data().department);
    };

    getData();
  }, [params]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "todo", params.id), {
      title: title,
      desc: desc,
      department: department,
      date: new Date().toLocaleDateString(),
      completed: false,
    });

    navigate("/dashboard/tasks");
  };

  return (
    <form className="flex flex-col mt-6 items-center justify-center gap-8 w-full bg-transparent pl-1 pr-1">
      <input
        type="text"
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Feladat neve"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        className="block p-2.5 w-full md:w-96 sm:w-96   text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Add meg a feladat leírását..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
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

      <button
        onClick={handleEdit}
        className=" text-xs w-full bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Adatok módosítása
      </button>
    </form>
  );
};

export default EditTodo;
