import React, { useEffect, useState } from "react";
import { doc, deleteDoc, addDoc } from "firebase/firestore";
import Todo from "./Todo";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { selectName } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const userName = useSelector(selectName);

  useEffect(() => {
    const q = query(collection(db, "todo"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray.filter((todo) => todo.author === userName));
    });
    return () => unsub();
  }, [userName]);

  const toggleComplete = async (todo) => {
    await addDoc(collection(db, "completed"), {
      author: userName,
      title: todo.title,
      desc: todo.desc,
      department: todo.department,
      date: new Date().toLocaleDateString(),
      completed: true,
    });

    await deleteDoc(doc(db, "todo", todo.id));
    navigate("/dashboard/tasks");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todo", id));

    navigate("/dashboard/done");
    navigate("/dashboard/tasks");
  };

  return (
    <div className=" w-full mt-4 bg-transparent">
      {todos.map((todo) => (
        <div
          className="flex justify-between mb-5 p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          key={todo.id}
        >
          <div className="flex justify-between w-full ">
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={() => handleDelete(todo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
