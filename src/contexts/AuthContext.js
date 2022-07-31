import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../services/localStorage";
import axios from "../config/axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

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
      console.log(body);
      const res = await axios.post("/signin", body);
      setAccessToken(res.data.token);
      setUser(res.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = () => {
    removeAccessToken();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOut,
        signIn,
        userName,
        // error,
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
