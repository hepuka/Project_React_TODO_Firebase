import "./App.css";
import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import EditNote from "./components/EditNote";
import Done from "./components/Done";
import Jegyzetek from "./components/Jegyzetek";
import Register from "./components/Register";
import Main from "./adminpages/Main";
import Users from "./adminpages/Users";
import Repassword from "./adminpages/Repassword";
import Roles from "./adminpages/Roles";
import Tasks from "./adminpages/Tasks";
import Menu from "./components/Menu";
import Newpassword from "./components/Newpassword";
import Statistics from "./components/Statistics";
import Details from "./components/Details";
import Feedback from "./components/Feedback";
import Gyik from "./components/Gyik";

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
            <Route path="note/:id" element={<EditNote />} />
            <Route path="done" element={<Done />} />
            <Route path="ip" element={<Jegyzetek />} />
            <Route path="add" element={<AddTodo />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/newpassword" element={<Newpassword />} />
            <Route path="menu/statistics" element={<Statistics />} />
            <Route path="menu/details" element={<Details />} />
            <Route path="menu/feedback" element={<Feedback />} />
            <Route path="menu/gyik" element={<Gyik />} />
          </Route>

          <Route path="/main" element={<Main />}>
            <Route path="users" element={<Users />} />
            <Route path="repassword" element={<Repassword />} />
            <Route path="roles" element={<Roles />} />
            <Route path="inprogress" element={<Tasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
