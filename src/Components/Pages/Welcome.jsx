import React, { useState } from "react";
import { ID, account } from "../../appwrite/Auth";
import Home from "./Home";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="shadow-2xl flex flex-col max-w-64 m-auto border-2 justify-center items-center border-green-400 p-1 bg-transparent mt-3">
      <p>Don't have account please Signup</p>
      <button className="bg-green-600 rounded-xl px-3 text-xl text-white font-bold">
        <Link to={"/signup"}>
          <h1 className="p-3 text-xl">SignUp</h1>
        </Link>
      </button>
      <p>Have a account please Login</p>
      <button className="bg-blue-600 rounded-xl px-3 text-xl text-white font-bold">
        <Link to={"/login"}>
          <h1 className="p-3 text-xl">Login</h1>
        </Link>
      </button>

      
    </div>
  );
}

export default Welcome;
