import React, { useContext, useEffect, useState } from "react";
import { account } from "../appwrite/Auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Header() {
  const [name, setName] = useState("");
  const d = new Date();
  const [currentDate, setCurrentDate] = useState(d.toDateString());

  const navigate = useNavigate();
  const logout = async () => {
    try {
      const promise = await account.deleteSessions();

      alert("logout successful");
      navigate("/login");
      // console.log(promise);
    } catch (error) {
      // console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const promise = await account.get();
      if (promise) setName(promise.name);
      else setName("no User ");
    } catch (error) {
      setName("No user");
      //console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const { userName } = useContext(AuthContext);
  // console.log(user);
  useEffect(() => {
    setName(userName);
  });

  return (
    <div className=" shadow-lg capitalize sm:bg-neutral-300 my-2 p-3 sm:m-0  w-full flex justify-evenly items-center sm:h-6  sm:flex-row flex-col ">
      <h2 className="text-lg  capitalize">Hello : {name}</h2>
      <p className="font-thin duration-150  sm:inline-block hidden ">
        {currentDate}
      </p>
      <button
        onClick={logout}
        className="rounded-xl bg-red-700 font-bold text-white px-3"
      >
        Logout
      </button>
    </div>
  );
}
export default Header;
