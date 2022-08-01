import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/common/Spinner";
import { useError } from "../contexts/ErrorContext";
import validator from "validator";
import PageNavigate from "../components/common/PageNavigate";
import axios from "../config/axios";

export default function Password({ setChangePass }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [load, setLoad] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const { error, setError } = useError();

  const [newPassword, setNewPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorNewPassword, setErrorNewPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmitChange = async () => {
    try {
      if (!newPassword.password) {
        setErrorNewPassword((p) => ({
          ...p,
          password: "* Please enter this input",
        }));
        return;
      }
      if (!newPassword.newPassword) {
        setErrorNewPassword((p) => ({
          ...p,
          newPassword: "* Please enter this input",
        }));
        return;
      }
      if (
        !newPassword.confirmPassword ||
        newPassword.confirmPassword !== newPassword.newPassword
      ) {
        setErrorNewPassword((p) => ({
          ...p,
          confirmPassword: "* New Password & ConfirmPassword did not match",
        }));
        return;
      }

      setLoad(true);

      await axios.patch("/update", newPassword);
      navigate("/");

      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {load && <Spinner />}
      <div className='mainContainer space-y-6 absolute inset-0 bg-white'>
        <div onClick={() => setChangePass(false)}>
          <PageNavigate title='Change password' />
        </div>
        <div>
          <Input
            value={newPassword.password}
            type='password'
            label='Old password'
            placeholder=''
            onChange={(e) => {
              setNewPassword((p) => ({ ...p, password: e.target.value }));
              setErrorNewPassword((p) => ({
                ...p,
                password: "",
              }));
            }}
          />
          {errorNewPassword.password && (
            <p className='text-xs text-red-400 mt-2'>
              {errorNewPassword.password}
            </p>
          )}

          <Input
            type='password'
            value={newPassword.newPassword}
            label='New Password'
            placeholder=''
            onChange={(e) => {
              setNewPassword((p) => ({ ...p, newPassword: e.target.value }));
              setErrorNewPassword((p) => ({
                ...p,
                newPassword: "",
              }));
            }}
          />
          {errorNewPassword.newPassword && (
            <p className='text-xs text-red-400 mt-2'>
              {errorNewPassword.newPassword}
            </p>
          )}
          <Input
            type='password'
            value={newPassword.confirmPassword}
            label='Confirm Password'
            placeholder=''
            onChange={(e) => {
              setNewPassword((p) => ({
                ...p,
                confirmPassword: e.target.value,
              }));
              setErrorNewPassword((p) => ({
                ...p,
                confirmPassword: "",
              }));
            }}
          />
          {errorNewPassword.confirmPassword && (
            <p className='text-xs text-red-400 mt-2'>
              {errorNewPassword.confirmPassword}
            </p>
          )}
          {error && (
            <p className='text-xs text-red-400 mt-2'>* Please try again!</p>
          )}
        </div>
        <button className='primary ' onClick={handleSubmitChange}>
          Save
        </button>
      </div>
    </>
  );
}
