import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { selectName } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
const EditNote = () => {
  let params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const userName = useSelector(selectName);

  useEffect(() => {
    const docRef = doc(db, "notes", `${params.id}`);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      setTitle(docSnap.data().title);
      setDesc(docSnap.data().desc);
    };

    getData();
  }, [params]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "notes", params.id), {
      author: userName,
      title: title,
      desc: desc,
      date: new Date().toLocaleDateString(),
    });

    navigate("/dashboard/ip");
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

      <button
        onClick={handleEdit}
        className=" text-xs w-full bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Adatok módosítása
      </button>
    </form>
  );
};

export default EditNote;
