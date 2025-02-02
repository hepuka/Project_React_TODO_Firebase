import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-96 md:w-96  sm:px-8 md:px-8 px-8">
      <p className="text-xs mb-1 dark:text-gray-300 ">
        Készítette: Kun-Fagyal Zoltán &copy; {year}
      </p>
      <p className="text-xs dark:text-gray-300 ">Minden jog fenntartva!</p>
    </div>
  );
};

export default Footer;
