import React from "react";

const HeaderAdmin = () => {
  return (
    <div className="header">
      <div className="flex items-center justify-between h-full w-full">
        <img className="h-full mr-1 rounded-2xl" src="/logo.png" alt="" />
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-lg font-bold  text-center">
            Hajdú-Bihar Vármegyei Kormányhivatal
          </h1>
          <h1 className="text-lg font-bold text-center">
            Feladatnyilvántartó Portál
          </h1>
          <h2 className="text-lg">ADMIN PORTÁL</h2>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
