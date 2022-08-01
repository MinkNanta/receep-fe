import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Loading from "../components/common/Loading";
import PageNavigate from "../components/common/PageNavigate";
import { useAuth } from "../contexts/AuthContext";
import { removeAccessToken } from "../services/localStorage";
import Password from "./Password";
export default function User() {
  const [load, setLoad] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      {load && <Loading />}

      <div className='topLine'></div>
      <div className='mainContainer space-y-4 mt-9'>
        <PageNavigate to='/' title='My profile' />
        <Input
          type='text'
          value={user.email}
          label='Email'
          name='email'
          placeholder=''
          onChange={(e) => {}}
          disabled
        />

        {/* <h1> Hi! 🥷 {user.email}</h1> */}
        <button
          className='block outLine w-full '
          onClick={() => setChangePass(true)}
        >
          Change password
        </button>
        {changePass && <Password setChangePass={setChangePass} />}
        <button
          className='block outLine w-full '
          onClick={() => navigate("/all-category")}
        >
          my category
        </button>
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
