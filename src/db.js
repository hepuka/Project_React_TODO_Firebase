import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";

export const tabs = [
  {
    name: "Új feladat",
    path: "/dashboard/add",
    icon: <MdAddTask />,
  },
  {
    name: "Feladatok",
    path: "/dashboard/tasks",
    icon: <FaTasks />,
  },
  {
    name: "Teljesített",
    path: "/dashboard/done",
    icon: <IoMdDoneAll />,
  },
  {
    name: "Jegyzetek",
    path: "/dashboard/ip",
    icon: <FaRegNoteSticky />,
  },
];

export const adminmenu = [
  { route: "/main/users", name: "Felhasználók" },
  { route: "/main/roles", name: "Jogosultságkezelő" },
  { route: "/main/inprogress", name: "Folyamatban lévő és lezárt feladatok" },
  { route: "/main/repassword", name: "Elfelejtett jelszó" },
];
