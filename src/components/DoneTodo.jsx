import React from "react";

export default function DoneTodo({ todo }) {
  return (
    <div className="flex w-full min-h-24 justify-between">
      <div className="flex flex-col justify-between w-full gap-3">
        <div className="flex items-start justify-between">
          <img className="w-14 h-14 mr-2" src="/logo.png" alt="" />
          <div className=" flex flex-col w-full text-xs">
            <p className="text-sm font-bold">{todo.title}</p>
            <p className="text-xs dark:text-gray-300">{todo.date}</p>
            <p className="text-xs dark:text-gray-300"> #{todo.department}</p>
          </div>
        </div>
        <div className=" flex text-xs w-full h-full">
          <p className="text-justify text-sm dark:text-gray-200">{todo.desc}</p>
        </div>
      </div>
    </div>
  );
}
