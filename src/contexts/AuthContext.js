import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../services/localStorage";
import axios from "../config/axios";
import { useNavigate } from "react-router";
import { useError } from "./ErrorContext";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fetch, setFetch] = useState(false);
  // const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const { setError } = useError();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const res = await axios.get("/");
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        removeAccessToken();
        navigate("/main");
        setError(error.message);
      }
    };
    fetchUser();
  }, [fetch]);

  // const signUp = async (body) => {
  //   try {
  //     const res = await axios.post("/signup", body);
  //     setAccessToken(res.data.token);
  //     setUser(res.data.token);
  //     setFetch((p) => !p);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const signIn = async (body) => {
    try {
      const res = await axios.post("/signin", body);
      setAccessToken(res.data.token);
      setUser(res.data.token);
      setFetch((p) => !p);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx;
}

export default AuthContextProvider;
export { useAuth, AuthContext };
