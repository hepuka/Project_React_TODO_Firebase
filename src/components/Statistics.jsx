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
    <div className="flex flex-wrap items-start justify-between w-full gap-10">
      <div className="statbox-text">
        <p className="text-sm">Folyamatban lévő feladatok: </p>
        <p className="text-sm">{todoNumbers}</p>
      </div>

      <div className="statbox-text">
        <p className="text-sm">Teljesített feladatok:</p>
        <p className="text-sm">{completednumbers}</p>
      </div>
      <div className="statbox-text">
        <p className="text-sm">Jegyzetek: </p>
        <p className="text-sm">{notesnumbers}</p>
      </div>
    </div>
  );
};

export default Statistics;
