import React, { useEffect, useState } from "react";
import { doc, deleteDoc, addDoc } from "firebase/firestore";
import Todo from "./Todo";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const savedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const q = query(collection(db, "todos"));
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
  }, [savedUserData.displayName]);

  const toggleComplete = async (todo) => {
    await addDoc(collection(db, "completed"), {
      author: savedUserData.displayName,
      title: todo.title,
      desc: todo.desc,
      department: todo.department,
      date: new Date().toLocaleDateString(),
      completed: true,
    });

    await deleteDoc(doc(db, "todos", todo.id));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className=" w-full mt-4 md:w-96 sm:w-96">
      {todos.map((todo) => (
        <div
          className="flex justify-between mb-5 p-2.5 w-full md:w-96 sm:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          key={todo.id}
        >
          <Link to={`/dashboard/edit/${todo.id}`} key={todo.id}>
            <div className="flex justify-between">
              <Todo key={todo.id} todo={todo} />
            </div>
          </Link>
          <div className="flex gap-6">
            <button onClick={() => toggleComplete(todo)}>
              <CheckCircleIcon id="i" />
            </button>
            <button onClick={() => handleDelete(todo.id)}>
              <DeleteIcon id="i" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
