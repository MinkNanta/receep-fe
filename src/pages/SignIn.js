import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/common/Spinner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [load, setLoad] = useState(false);

  const handleSubmitSignIn = async () => {
    try {
      setLoad(true);
      const body = { email, password };
      await signIn(body);

      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };

  return (
    <>
      {load && <Spinner />}
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
            value={password}
            label='Password'
            placeholder='Your password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='primary ' onClick={handleSubmitSignIn}>
          Sign in
        </button>
      </div>
    </>
  );
}
