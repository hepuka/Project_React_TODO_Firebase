import React from "react";
import { NavLink } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import { selectTodonumbers } from "../redux/slice/getNumbers";
import { selectCompletednumbers } from "../redux/slice/getNumbers";
import { selectNotesnumbers } from "../redux/slice/getNumbers";
import { useSelector } from "react-redux";
const Navbar = () => {
  const todonumber = useSelector(selectTodonumbers);
  const completednumber = useSelector(selectCompletednumbers);
  const notesnumber = useSelector(selectNotesnumbers);

  return (
    <div className="flex justify-around items-center w-full fixed bottom-5 left-0 right-0">
      <NavLink
        to="/dashboard/add"
        className={({ isActive }) =>
          isActive
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
      >
        <MdAddTask size={22} />
        <span className="text-[10px] ">Új feladat</span>
      </NavLink>

      <NavLink
        to="/dashboard/tasks"
        className={({ isActive }) =>
          isActive
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
      >
        <FaTasks size={22} />
        <span className="text-[10px]">
          Feladatok <span>({todonumber})</span>
        </span>
      </NavLink>

      <NavLink
        to="/dashboard/done"
        className={({ isActive }) =>
          isActive
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
      >
        <IoMdDoneAll size={22} />
        <span className="text-[10px]">
          Teljesített <span>({completednumber})</span>
        </span>
      </NavLink>

      <NavLink
        to="/dashboard/ip"
        className={({ isActive }) =>
          isActive
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
      >
        <FaRegNoteSticky size={22} />
        <span className="text-[10px]">
          Jegyzetek <span>({notesnumber})</span>
        </span>
      </NavLink>

      <NavLink
        to="/dashboard/menu"
        className={({ isActive }) =>
          isActive
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
      >
        <CiMenuBurger size={22} />
        <span className="text-[10px]">Menü</span>
      </NavLink>
    </div>
  );
};

export default Navbar;
