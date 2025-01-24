import React from "react";
import { Link } from "react-router-dom";

const Jegyzetek = () => {
  return (
    <div className="flex flex-col items-center w-full mt-4 md:w-96 sm:w-96">
      <Link
        to={"/dashboard/add"}
        className="text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Új Jegyzet
      </Link>
    </div>
  );
};

export default Jegyzetek;
