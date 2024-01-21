import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { databases } from "../../appwrite/Auth";

function SingleTodo() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [todoTitle, setTodoTitle] = useState("");
  const [todoTask, setTodoTask] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const { todoId } = useParams();
  console.log(todoId);

  const getData = async () => {
    const data = await databases.getDocument(
      "65abe5f65eb266e9fb2f",
      "65abe6072c60914c510b",
      todoId
      // [Query.equal("$id", $id)]
    );

    setTodoTask(data.todoTask);
    setTodoTitle(data.todoTitle);
    setTodoDate(JSON.parse( data.todoDate));
  };

  useEffect(() => {
    getData();
  }, []);
  const { deleteTodo } = useContext(AuthContext);
  return loader ? (
    ""
  ) : (
    <div className="bg-blue -400 sm:w-5/6 sm:m-auto capitalize">
      <h3 className="text-3xl">{todoTitle}</h3>
      <h6 className="text-xs">{todoDate}</h6>
      <div className="flex w-full m-1 justify-between p-2    ">
        <button
          className="rounded-full hover:bg-red-400 p-2"
          onClick={(e) => {
            setLoader(true);
            deleteTodo(todoId);
            setLoader(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <button
          className="rounded-full hover:bg-blue-400 p-2"
          onClick={(e) => {
            setLoader(true);
            navigate(`/edit/${todoId}`);
            setLoader(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
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
      </div>

      {/* <p className="min-h-24 bg-slate-100 text-[16px]">
          {todo.todoTask.length > 60 ? `${todo.todoTask}` : todo.todoTask.length}
        </p> */}
      <p className=" text-[16px] max-h-96 overflow-y-scroll capitalize bg-slate-400 p-3">{todoTask}</p>
    </div>
  );
}
export default SingleTodo;
