import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/common/Spinner";
import { useError } from "../contexts/ErrorContext";
import validator from "validator";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [load, setLoad] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const { error, setError } = useError();

  const handleSubmitSignIn = async () => {
    try {
      if (!validator.isEmail(email)) {
        setErrorDetail(true);
        return;
      }
      if (!password) {
        setErrorPassword(true);
        return;
      }
      setLoad(true);
      const body = { email, password };
      await signIn(body);

      setLoad(false);
    } catch (error) {
      setErrorDetail(false);
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
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorDetail(false);
              setError(null);
            }}
          />
          {errorDetail && (
            <p className='text-xs text-red-400 mt-2'>
              * please enter a valid email address.
            </p>
          )}

          <Input
            type='password'
            value={password}
            label='Password'
            placeholder='Your password'
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPassword(false);
            }}
          />
          {errorPassword && (
            <p className='text-xs text-red-400 mt-2'>
              * please enter a password.
            </p>
          )}
          {error && (
            <p className='text-xs text-red-400 mt-2'>
              * wrong email or password please try again!
            </p>
          )}
        </div>
        <button className='primary ' onClick={handleSubmitSignIn}>
          Sign in
        </button>
        <p className=' text-center text-gray-400 py-6'>
          contact for more information at <br /> 084 622 9466
        </p>
      </div>
    </>
  );
}
