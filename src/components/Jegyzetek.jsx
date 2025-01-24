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
import DeleteIcon from "@mui/icons-material/Delete";

const Jegyzetek = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const savedUserData = JSON.parse(localStorage.getItem("userData"));
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      setNotes(
        notesArray.filter((note) => note.author === savedUserData.displayName)
      );
    });
    return () => unsub();
  }, [savedUserData.displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && desc !== "") {
      await addDoc(collection(db, "notes"), {
        author: savedUserData.displayName,
        title: title,
        desc: desc,
        date: new Date().toLocaleDateString(),
      });

      setTitle("");
      setDesc("");
    }
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <div className="flex flex-col items-center w-full md:w-96 sm:w-96">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-3 items-center justify-center gap-2 w-full"
      >
        <input
          type="text"
          className="block p-2.5 w-full h-10 md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Jegyzet neve"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          className="block p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Jegyzet"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <button className="text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Hozzáad
        </button>
      </form>
      <div className=" w-full mt-4 md:w-96 sm:w-96 ">
        {notes.map((note) => (
          <div
            className="flex justify-between mb-5 p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            key={note.id}
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">{note.title}</p>
                <p className="text-xs">{note.date}</p>
                <p className="text-sm">{note.desc}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <button onClick={() => handleDelete(note.id)}>
                <DeleteIcon id="i" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jegyzetek;
