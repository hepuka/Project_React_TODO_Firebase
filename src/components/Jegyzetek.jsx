import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Note from "./Note";

const Jegyzetek = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState([]);
  const currentUserData = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      setNotes(
        notesArray.filter((note) => note.author === currentUserData.name)
      );
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && desc !== "") {
      await addDoc(collection(db, "notes"), {
        author: currentUserData.name,
        title: title,
        desc: desc,
        date: new Date().toLocaleDateString(),
      });

      setTitle("");
      setDesc("");
      navigate("/dashboard/ip");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    navigate("/dashboard/ip");
  };

  return (
    <div className="flex flex-col items-center w-full md:w-96 sm:w-96 bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-3 items-center justify-center gap-2 w-full pl-1 pr-1"
      >
        <input
          type="text"
          className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Jegyzet neve"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          className="block p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Jegyzet"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <button className="mt-4 text-xs bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 border border-gray-400 rounded shadow">
          Hozzáad
        </button>
      </form>
      <div className=" w-full mt-4 md:w-96 sm:w-96 bg-transparent ">
        {notes.map((note) => (
          <div
            className="flex justify-between mb-5 p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900  rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            key={note.id}
          >
            <div className="flex justify-between w-full ">
              <Note
                key={note.id}
                todo={note}
                handleDelete={() => handleDelete(note.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jegyzetek;
