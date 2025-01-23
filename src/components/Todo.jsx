import React from "react";

export default function Todo({ todo }) {
  return (
    <div className="flex justify-between w-full px-3 py-2 cursor-pointer">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold">{todo.title}</p>
        <p className="text-xs">
          {todo.date} <span className="text-xs ml-6">{todo.department}</span>
        </p>
        <p className="text-sm">{todo.desc}</p>
      </div>
    </div>
  );
}
