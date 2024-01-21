import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { account, databases } from "./appwrite/Auth";
import AuthContext from "./context/AuthContext";
import { Query } from "appwrite";
function App() {
  const [loader, setLoader] = useState(false);

  const [updateValues, setUpdateValues] = useState(false);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userTodos, setUserTodos] = useState([]);

  const navigate = useNavigate();
  function update() {
    setUpdateValues(!updateValues);
  }
  const getUser = async () => {
    try {
      setLoader(true);
      const promise = await account.get();
      if (promise) {
        setUserName(promise.name);
        setUserId(promise.$id);
        setLoader(false);
      }
    } catch (error) {
      setLoader(true);
      setUserName("no user");
      // navigate("/login");
      setLoader(false);
    }
  };
  const loadAllUser = async () => {
    // console.log("first");
    try {
      setLoader(true);
      const getUser = await account.get();
      // console.log(getUser);
      if (getUser) {
        let promise = await databases.listDocuments(
          "65abe5f65eb266e9fb2f",
          "65abe6072c60914c510b",
          [Query.equal("userId", getUser.$id)]
        );

        if (promise) {
          setUserTodos(promise.documents);
        }
        setLoader(false);
      }
    } catch (error) {
      setLoader(true);
      // console.log("from cathch");
      console.log(error);
      setLoader(false);
    }
  };

  const deleteTodo = async ($id) => {
    try {
      setLoader(true);
      const getUser = await account.get();
      if (getUser) {
        const promise = await databases.deleteDocument(
          "65abe5f65eb266e9fb2f",
          "65abe6072c60914c510b",
          $id
        );
        // console.log(promise);
        navigate("/");
        loadAllUser();
        setLoader(false);
        // console.log(promise);
      } else {
        setLoader(true);
        console.log("please login");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async ($id, data) => {
    try {
      setLoader(true);
      const getUser = await account.get();
      if (getUser) {
        const promise = await databases.updateDocument(
          "65abe5f65eb266e9fb2f",
          "65abe6072c60914c510b",
          $id,
          {
            ...data,
          }
        );
        console.log(promise);
        navigate("/");
        loadAllUser();
        setLoader(false);
        // console.log(promise);
      } else {
        setLoader(true);
        console.log("please login");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    getUser();

    loadAllUser();
  }, [updateValues]);

  return (
    <div className=" bg-slate-300 p-2 w-full h-full min-h-screen max-w-6xl m-auto">
      <AuthContext.Provider
        value={{
          userName: userName,
          userId: userId,
          todos: userTodos,
          updateValues: updateValues,
          setUpdateValues: setUpdateValues,
          deleteTodo: deleteTodo,
          update: update,
          editTodo: editTodo,
        }}
      >
        {loader ? (
          <div
            className=" absolute m-auto sm:top-1/2  sm:right-1/2 bg-green-400
            sm:duration-300  sm:animate-bounce sm:w-36 sm:h-36 w-screen h-screen rounded-full
          flex justify-center
          items-center
          text-3xl
          animate-ping
duration-700
          "
          >
            Laoding
          </div>
        ) : null}
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
