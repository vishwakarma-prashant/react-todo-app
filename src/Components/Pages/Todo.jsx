import React from "react";
import { useParams } from "react-router-dom";
import EditTodo from "../EditTodo";

function Todo() {
  const { todoId } = useParams();
  // console.log(todoId);

  return (
    <div>
      
      <EditTodo $id={todoId} />

    </div>
  );
}

export default Todo;
