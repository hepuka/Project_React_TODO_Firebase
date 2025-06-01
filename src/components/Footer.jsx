import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <p className="text-xs dark:text-gray-300 ">
        Készítette: Kun-Fagyal Zoltán &copy; {year}
      </p>
      <p className="text-xs dark:text-gray-300 ">Minden jog fenntartva!</p>
    </>
  );
};

export default Footer;
