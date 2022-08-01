import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import PageNavigate from "../components/common/PageNavigate";
import axios from "../config/axios";
import { useMenu } from "../contexts/MenuContext";
import Spinner from "../components/common/Spinner";

export default function AddNewCategory() {
  const { getAllCategory, newCategory, setNewCategory, setNewMenu } = useMenu();
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const values = { ...newCategory };
    values[event.target.name] = event.target.value;
    setNewCategory(values);
  };
  const [errorName, setErrorName] = useState(false);
  const [errorIcon, setErrorIcon] = useState(false);
  const [load, setLoad] = useState(false);

  const handleSubmitCategory = async () => {
    try {
      if (!newCategory.icon) {
        setErrorIcon(true);
        return;
      }
      if (!newCategory.name || newCategory.name.length > 7) {
        setErrorName(true);
        return;
      }
      setLoad(true);

      const res = await axios.post("/menu/createCategory", newCategory);

      // console.log(res.data.category);
      getAllCategory();
      setNewMenu((p) => ({ ...p, category: res.data.category.id }));
      navigate("/create-menu");
      setNewCategory({
        icon: "",
        name: "",
      });
      setLoad(false);
    } catch (error) {
      setErrorIcon(false);
      setErrorName(false);

      setNewCategory({
        icon: "",
        name: "",
      });
      // console.log(error.message);
    }
  };

  // console.log(newCategory);
  return (
    <>
      {load && <Spinner />}

      <div className='topLine'></div>
      <div className='mainContainer space-y-6 relative'>
        <PageNavigate to='/create-Category' title='Add new category' />
        <div>
          <Input
            value={newCategory.icon}
            label='Icon'
            name='icon'
            placeholder=''
            onChange={(e) => {
              handleChangeInput(e);
              setErrorIcon(false);
            }}
          />
          {errorIcon && (
            <p className='text-xs text-red-400 pt-1'>
              * name must contain maximum 1 letter
            </p>
          )}
          <Input
            value={newCategory.name}
            label='Name'
            name='name'
            placeholder=''
            onChange={(e) => {
              handleChangeInput(e);
              setErrorName(false);
            }}
          />
          {errorName && (
            <p className='text-xs text-red-400 pt-1'>
              * name must contain maximum 6 letter
            </p>
          )}
        </div>
      </div>
      <button className='primary down' onClick={handleSubmitCategory}>
        save
      </button>
    </>
  );
}
