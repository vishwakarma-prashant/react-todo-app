import React from "react";
import Header from "../Header";
import Todos from "./Todos";
import AddTodo from "../AddTodo";

function Main() {
  return (
    <>
      <Header />
      <br/>

      <div className="flex sm:flex-row flex-col-reverse gap-2 ">
        <div className="sm:w-3/4 m-auto  p-2 w-full bg-slate-300 shadow-lg sm:h-screen overflow-y-scroll ">
          <Todos />
        </div>
        <div className="sm:w-3/12 p-3 m-auto w-full bg-slate-300  shadow-xl sm:h-screen">
          <AddTodo />
        </div>
      </div>
    </>
  );
}

export default Main;
