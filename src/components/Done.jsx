import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import DoneTodo from "./DoneTodo";
import { selectName } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
const Done = () => {
  const [todos, setTodos] = useState([]);
  const userName = useSelector(selectName);

  useEffect(() => {
    const q = query(collection(db, "completed"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray.filter((todo) => todo.author === userName));
    });
    return () => unsub();
  }, []);

  return (
    <div className=" w-full mt-4 bg-transparent">
      {todos.map((todo) => (
        <div
          className="flex justify-between mb-5 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          key={todo.id}
        >
          <div className="flex justify-between w-full">
            <DoneTodo key={todo.id} todo={todo} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Done;
