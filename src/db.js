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
