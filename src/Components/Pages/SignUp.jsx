import { ID } from "appwrite";
import React, { useContext, useId, useState } from "react";
import { account } from "../../appwrite/Auth";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function SignUp() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const id = useId();
  const navigate = useNavigate();
  async function signUp(name, email, password) {
    return await account.create(ID.unique(), email, password, name);
  }

  const handelSignup = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setError(false);
    setLoader(true);
    const promise = signUp(name, email, password);

    promise
      .then(function (response) {
        // console.log("then", response); // Success
        setError(true);
        setLoader(false);
        navigate("/login");
      })
      .catch(function (err) {
        console.log(err);
        setLoader(true);
        setError(true);
        setErrorMsg(err);
        setEmail("");
        setLoader(false);
      });
  };
  return (
    <form
      className="shadow-2xl flex flex-col max-w-64 m-auto border-2 justify-center items-center border-green-400 p-1 bg-transparent mt-3"
      onSubmit={handelSignup}
    >
      <h3>SignUp</h3>

      {loader ? <h1>Loading</h1> : null}
      <p className="text-red-600">
        {error ? `Somthing wrong ${errorMsg} ` : ""}
      </p>

      <div className=" p-2">
        <label className="inline-block " htmlFor="title">
          Name
        </label>
        <input
          type="name"
          id="name"
          placeholder="Enter user name"
          className="outline-none bg-white shadow-md border-none w-full p-1  h-5 "
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
      </div>

      <div className=" p-2">
        <label className="inline-block " htmlFor="title">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          className="outline-none bg-white shadow-md border-none w-full p-1  h-5 "
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
      </div>
      <div className=" p-2">
        <label className="inline-block " htmlFor="task">
          Password
        </label>
        <input
          id="password"
          placeholder="Enter password"
          className="resize-none outline-none bg-white shadow-md border-none w-full p-2  h-5  "
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button
        type="submit"
        // onClick={handelSignup}
        className="rounded-lg bg-green-500 w-auto px-2  text-black my-3
        duration-150 hover:bg-red-500 hover:text-white
        "
      >
        SignUp
      </button>
      <p className="text-xs">
        Already have a account please{" "}
        <Link to={"/login"}>
          <span className="underline text-blue-500">Login</span>
        </Link>
      </p>
    </form>
  );
}

export default SignUp;
