import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Todo from "./Todo";

const Done = () => {
  const [todos, setTodos] = useState([]);
  const savedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const q = query(collection(db, "completed"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(
        todosArray.filter((todo) => todo.author === savedUserData.displayName)
      );
    });
    return () => unsub();
  }, [todos]);

  return (
    <div className=" w-full mt-4 md:w-96 sm:w-96 ">
      {todos.map((todo) => (
        <div
          className="flex justify-between mb-5 p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          key={todo.id}
        >
          <div className="flex justify-between">
            <Todo key={todo.id} todo={todo} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Done;
