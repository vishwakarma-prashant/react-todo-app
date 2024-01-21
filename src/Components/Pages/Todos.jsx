import React, { useContext, useEffect } from "react";
import Todo from "./Todo";
import TodoCard from "../TodoCard";
import { account, databases } from "../../appwrite/Auth";
import { ID, Query } from "appwrite";
import AuthContext from "../../context/AuthContext";

function Todos() {
  const { todos, setUpdateValues, updateValues } = useContext(AuthContext);
  useEffect(() => {
    setUpdateValues(!updateValues);
  }, []);

  if (todos.length === 0) {
    return (
      <div className="sm:grid sm:grid-cols-2 sm:place-items-center">
        Please Add some task
      </div>
    );
  } else {
    return (
      <div className="sm:grid sm:grid-cols-2 sm:place-items-center">
        
        {todos.map((todo) => {
          return <TodoCard key={todo.$id} todo={todo} />;
        })}
      </div>
    );
  }
}

export default Todos;
