import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Todos from "../Pages/Todos";
import AddTodo from "../AddTodo";
import Header from "../Header";
import Main from "./Main";
import Welcome from "./Welcome";
import { account, databases } from "../../appwrite/Auth";
import AuthContext from "../../context/AuthContext";
function Home() {
  const [isLogin, setIsLogin] = useState(false);

  const getUser = async () => {
    try {
      const promise = await account.get();
      if (promise) setIsLogin(true);
      else setIsLogin(false);
    } catch (error) {
      setIsLogin(false);
      //console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {isLogin ? <Main /> : <Welcome />}

      {/* <Main /> */}
    </>
  );
}

export default Home;
