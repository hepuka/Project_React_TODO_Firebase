import "./App.css";
import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import Done from "./components/Done";
import Jegyzetek from "./components/Jegyzetek";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="dashboard" element={<Dashboard />}>
            <Route path="" element={<TodoList />} />
            <Route path="tasks" element={<TodoList />} />
            <Route path="edit/:id" element={<EditTodo />} />
            <Route path="done" element={<Done />} />
            <Route path="ip" element={<Jegyzetek />} />
            <Route path="add" element={<AddTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
