import React, { useContext, useEffect, useId, useState } from "react";
import AuthContext from "../context/AuthContext";
import { databases } from "../appwrite/Auth";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

function EditTodo({ $id }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const id = useId();
  const d = new Date();
  const [error, setError] = useState("");

  const [todoTitle, setTodoTitle] = useState("");
  const [todoTask, setTodoTask] = useState("");

  const { setUpdateValues, updateValues, editTodo } = useContext(AuthContext);

  const getData = async () => {
    const data = await databases.getDocument(
      "65abe5f65eb266e9fb2f",
      "65abe6072c60914c510b",
      $id
      // [Query.equal("$id", $id)]
    );

    setTodoTask(data.todoTask);
    setTodoTitle(data.todoTitle);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <form
      className="flex flex-col  max-w-96 m-auto"
      onSubmit={(e) => {
        e.preventDefault();
        if (todoTask !== "" && todoTitle !== "") {
          setLoader(true);

          editTodo($id, {
            todoTitle: todoTitle,
            todoTask: todoTask,
            todoDate: JSON.stringify(d.toLocaleDateString()),
          });
          setTodoTask("");
          setTodoTitle("");
          setLoader(false);
        } else {
          setError("no text ");
        }
      }}
    >
      <div className="w-full text-center flex justify-evenly">
        {" "}
        <button
          className="rounded-full bg-green-600 hover:bg-red-400 p-2"
          onClick={(e) => {
            setLoader(true);
            navigate("/");
            setLoader(false);
          }}
        >
          Home
        </button>
        <button
          className="rounded-full bg-orange-600 hover:bg-red-400 p-2"
          onClick={(e) => {
            setLoader(true);
            navigate(`/todo/${$id}`);
            setLoader(false);
          }}
        >
          Todo
        </button>
      </div>
      <p className="text-red-700">
        {error} {loader ? "saving" : null}{" "}
      </p>
      <div className="border-b-orange-400 border-b-2 p-2">
        <label className="inline-block " htmlFor="title">
          Title
        </label>

        <input
          value={todoTitle}
          onChange={(e) => {
            setError("");
            setTodoTitle(e.currentTarget.value);
          }}
          id="title"
          placeholder="Enter todo title"
          className="outline-none bg-white shadow-md border-none w-full p-2  h-6 "
        />
      </div>
      <div className="border-b-orange-400 border-b-2 p-2">
        <label className="inline-block " htmlFor="task">
          Task
        </label>
        <textarea
          value={todoTask}
          onChange={(e) => {
            setError("");

            setTodoTask(e.currentTarget.value);
          }}
          id="task"
          placeholder="Enter todo task"
          className="resize-none outline-none bg-white shadow-md border-none w-full p-2  h-40 "
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-orange-500 text-white my-3"
      >
        Edit{" "}
      </button>
    </form>
  );
}

export default EditTodo;
