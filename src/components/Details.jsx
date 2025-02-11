import React from "react";
import { selectName, selectRole, selectEmail } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
const Details = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const role = useSelector(selectRole);

  return (
    <div className="mt-5 w-full text-sm">
      <div className="flex justify-between w-full pl-5 pr-5 mb-5">
        <p className="font-bold">Név:</p>
        <p>{name}</p>
      </div>
      <div className="flex justify-between w-full pl-5 pr-5 mb-5">
        <p className="font-bold">Email:</p>
        <p>{email}</p>
      </div>
      <div className="flex justify-between w-full pl-5 pr-5 mb-5">
        <p className="font-bold">Szerepkör:</p>
        <p>{role}</p>
      </div>
    </div>
  );
};

export default Details;
