import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";
const EditUser = () => {
  let params = useParams();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "users", `${params.id}`);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      setUser(docSnap.data());
    };

    getData();
  }, [params]);

  console.log(user);

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", params.id), {
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      date: new Date().toLocaleDateString(),
    });

    navigate("/main/users");
  };

  return (
    <div className="w-[500px] mx-auto">
      <div className="flex w-full justify-between h-full items-center mb-5">
        <p className="font-bold mr-32">Név</p>
        <input
          className="inputstyle"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="flex w-full justify-between h-full items-center mb-5">
        <p className="font-bold mr-32">Email</p>
        <input
          className="inputstyle"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex w-full justify-between h-full items-center mb-5">
        <p className="font-bold mr-32">Szerepkör</p>
        <input
          className="inputstyle"
          type="text"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        />
      </div>
      <div className="flex w-full justify-between h-full items-center mb-5">
        <p className="font-bold mr-32">jelszó</p>
        <input
          className="inputstyle"
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
    </div>
  );
};

export default EditUser;
