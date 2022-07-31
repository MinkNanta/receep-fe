import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { removeAccessToken } from "../services/localStorage";
export default function User() {
  const { user } = useAuth();
  return (
    <>
      <div className='topLine'></div>
      <div className='mainContainer space-y-4 text-center mt-9'>
        <h1> Hi! 🥷 {user.email}</h1>
        <a
          className='outLine block w-full'
          onClick={() => removeAccessToken()}
          href='/'
        >
          sign out
        </a>
      </div>
    </>
  );
}
