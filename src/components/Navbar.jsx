import React from "react";
import { Link } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";
import { useLocation } from "react-router-dom";
/* className={router.pathname === "/" ? "active" : ""} */

const Navbar = ({ todonumber, completednumber, notesnumber }) => {
  const location = useLocation();

  return (
    <div className="flex justify-around items-center w-full mb-7 h-9">
      <Link
        className={
          location.pathname === "/dashboard/add"
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
        to="/dashboard/add"
      >
        <MdAddTask size={22} />
        <span className="text-[10px] ">Új feladat</span>
      </Link>

      <Link
        className={
          location.pathname === "/dashboard/tasks"
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
        to="/dashboard/tasks"
      >
        <FaTasks size={22} />
        <span className="text-[10px]">
          Feladatok <span>({todonumber})</span>
        </span>
      </Link>

      <Link
        className={
          location.pathname === "/dashboard/done"
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
        to="/dashboard/done"
      >
        <IoMdDoneAll size={22} />
        <span className="text-[10px]">
          Teljesített <span>({completednumber})</span>
        </span>
      </Link>

      <Link
        className={
          location.pathname === "/dashboard/ip"
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
        to="/dashboard/ip"
      >
        <FaRegNoteSticky size={22} />
        <span className="text-[10px]">
          Jegyzetek <span>({notesnumber})</span>
        </span>
      </Link>

      <Link
        className={
          location.pathname === "/dashboard/menu"
            ? "active"
            : "flex flex-col justify-center items-center gap-2"
        }
        to="/dashboard/menu"
      >
        <CiMenuBurger size={22} />
        <span className="text-[10px]">Menü</span>
      </Link>
    </div>
  );
};

export default Navbar;
