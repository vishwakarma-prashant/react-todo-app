import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Todo from "./Components/Pages/Todo";
import App from "./App";
import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
import SingleTodo from "./Components/Pages/SingleTodo";
const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/edit/:todoId", element: <Todo /> },
      { path: "/todo/:todoId", element: <SingleTodo /> },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
