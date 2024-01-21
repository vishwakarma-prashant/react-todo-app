import { createContext } from "react";

const initalStore = {
  userName: "",
  userId: "",
  todos: [],
  updateValues: true,
  setUpdateValues: () => {},
  deleteTodo: () => {},
  update: () => {},
  getUser: () => {},
  editTodo:()=>{}
};

const AuthContext = createContext(initalStore);

export default AuthContext;
