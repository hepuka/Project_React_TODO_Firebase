import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function Note({ todo, handleDelete }) {
  return (
    <div className="flex w-full min-h-24 justify-between">
      <Link className="pr-3" to={`/dashboard/note/${todo.id}`} key={todo.id}>
        <div className="flex flex-col justify-between w-full gap-3">
          <div className="flex items-start justify-between">
            <div className=" flex flex-col w-full text-xs">
              <p className="text-sm font-bold">{todo.title}</p>
              <p className="text-xs dark:text-gray-300">{todo.date}</p>
            </div>
          </div>
          <div className=" flex text-xs w-full h-full">
            <p className="text-justify text-sm dark:text-gray-200">
              {todo.desc}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col justify-center h-full w-1/6 pt-2 pb-2">
        <button onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
