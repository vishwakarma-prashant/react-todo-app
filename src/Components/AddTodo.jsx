import React, { useContext, useId, useState } from "react";
import { ID, account, databases } from "../appwrite/Auth";
import AuthContext from "../context/AuthContext";

function AddTodo() {
  const [loader, setLoader] = useState(false);

  const id = useId();
  const d = new Date();
  const [error, setError] = useState("");

  const [todoTitle, setTodoTitle] = useState("");
  const [todoTask, setTodoTask] = useState("");

  const { setUpdateValues, updateValues } = useContext(AuthContext);

  const sendData = async () => {
    // e.preventDefault();
    try {
      setLoader(true);
      const getUser = await account.get();
      if (getUser) {
        const promise = await databases.createDocument(
          "65abe5f65eb266e9fb2f",
          "65abe6072c60914c510b",
          ID.unique(),
          {
            todoTitle: todoTitle,
            todoTask: todoTask,
            todoDate: JSON.stringify(d.toLocaleDateString()),
            userId: getUser.$id,
          }
        );
        setUpdateValues(!updateValues);
        // console.log(promise);
        setLoader(false);
      } else {
        setLoader(true);

        console.log("please login");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col "
      onSubmit={(e) => {
        e.preventDefault();
        if (todoTask !== "" && todoTitle !== "") {
          sendData();
          setTodoTask("");
          setTodoTitle("");
        } else {
          setError("no text ");
        }
      }}
    >
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
        Add task{" "}
      </button>
    </form>
  );
}

export default AddTodo;
