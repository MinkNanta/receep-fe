import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className='mainContainer space-y-6'>
      <h1 className='title'>
        Welcome to <br />
        <span className='text-main-400'>receep.</span>
      </h1>
      <p className='subTitle'>Create a simple receipt by yourself</p>
      <div>
        <Input
          value={email}
          label='E-mail'
          placeholder='Your email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          value={email}
          label='Password'
          placeholder='Your password'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className='primary ' onClick={() => navigate("main")}>
        Sign in
      </button>
    </div>
  );
}
