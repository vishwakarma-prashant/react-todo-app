import React, { useState } from "react";
import { account } from "../../appwrite/Auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loader, setLoader] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  async function login(email, password) {
    return await account.createEmailSession(email, password);
    // setLoggedInUser(await account.get());
  }
  const navigate = useNavigate();

  function handelLogin(e) {
    // console.log(e)
    e.preventDefault();
    setLoader(true);
    const promise = login(email, password);

    promise
      .then((res) => {
        // setError(false)
        // console.log("then :", res);
        setLoader(false);

        navigate("/");

        setError(false);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setError(true);
        // console.log("catch ", err);
        setEmail("");
        setPassword("");
      })
      .finally(setLoader(false));
  }
  return (
    <>
      <form
        className="shadow-2xl flex flex-col max-w-64 m-auto border-2 justify-center items-center border-blue-400 p-1 bg-transparent mt-3"
        onSubmit={handelLogin}
      >
        <h3>Login</h3>
        {loader ? <h1>Loading</h1> : null}

        {error ? <p className="text-red-500"> invalid user</p> : null}
        <div className=" p-2">
          <label className="inline-block " htmlFor="title">
            Email
          </label>
          <input
            value={email}
            type="email"
            id="email"
            placeholder="Enter email"
            className="outline-none bg-white shadow-md border-none w-full p-1  h-5 "
            onChange={(e) => {
              setError(false);
              setEmail(e.currentTarget.value);
            }}
          />
        </div>
        <div className=" p-2">
          <label className="inline-block " htmlFor="task">
            Password
          </label>
          <input
            value={password}
            id="password"
            placeholder="Enter password"
            className="resize-none outline-none bg-white shadow-md border-none w-full p-2  h-5  "
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button
          type="submit"
          // onSubmit={handelLogin}
          className="rounded-lg bg-blue-500 w-auto px-2  text-black my-3
       duration-150 hover:bg-red-500 hover:text-white
       "
        >
          Login
        </button>
        <p className="text-xs">
          Don't have a account please{" "}
          <Link to="/signup">
            <span className="underline text-green-500">SignUp</span>
          </Link>
        </p>

        <br />
      </form>

      <div className="m-auto w-60 text-center">
        <h2>Demo user :</h2>
        <div className="flex justify-between items-center">
          <p>Email : 123@test.com</p>{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              setEmail("123@test.com");
            }}
            className="bg-green-400 p-2 text-xs m-1 rounded-full active:bg-red-400"
          >
            copy
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p>password : 12345678</p>{" "}
          <button
            className="bg-green-300 p-2 text-xs m-1 rounded-full active:bg-red-400"
            onClick={(e) => {
              e.preventDefault();
              setPassword("12345678");
            }}
          >
            copy
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
