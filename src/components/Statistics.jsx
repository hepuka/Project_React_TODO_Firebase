import React from "react";
import {
  selectTodonumbers,
  selectNotesnumbers,
  selectCompletednumbers,
} from "../redux/slice/getNumbers";
import { useSelector } from "react-redux";
const Statistics = () => {
  const todoNumbers = useSelector(selectTodonumbers);
  const completednumbers = useSelector(selectCompletednumbers);
  const notesnumbers = useSelector(selectNotesnumbers);

  return (
    <div className="flex flex-col items-start sm:justify-around md:justify-around w-full h-20 mt-1 mb-3">
      <div className="flex w-full mb-5 gap-3">
        <div className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500">
          <p className="text-sm">Folyamatban lévő feladatok: </p>
          <p className="text-sm">{todoNumbers}</p>
        </div>

        <div className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500">
          <p className="text-sm">Teljesített feladatok:</p>
          <p className="text-sm">{completednumbers}</p>
        </div>
      </div>
      <div className="flex w-full mb-5 gap-3">
        <div className="flex flex-col items-start justify-center gap-2 px-2 w-2/4 h-20 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:border dark:border-gray-500">
          <p className="text-sm">Jegyzetek: </p>
          <p className="text-sm">{notesnumbers}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
