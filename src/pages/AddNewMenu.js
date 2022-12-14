import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import PageNavigate from "../components/common/PageNavigate";
import { useMenu } from "../contexts/MenuContext";
import axios from "../config/axios";
import Spinner from "../components/common/Spinner";

export default function AddNewMenu() {
  const {
    getAllCategory,
    category,
    setMenuById,
    menuById,
    newMenu,
    setNewMenu,
  } = useMenu();
  const [load, setLoad] = useState(false);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDes, setErrorDes] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        getAllCategory();
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleChangeInput = (event) => {
    const values = { ...newMenu };
    values[event.target.name] = event.target.value;
    setNewMenu(values);
  };

  const handleSubmitMenu = async () => {
    try {
      if (!newMenu.title) {
        setErrorTitle(true);
        return;
      }
      if (!newMenu.description) {
        setErrorDes(true);
        return;
      }
      if (!newMenu.price) {
        setErrorPrice(true);
        return;
      }

      setLoad(true);

      const res = await axios.post("/menu/create", newMenu);
      setMenuById(res.data);

      navigate("/menu");
      setLoad(false);
      setNewMenu([]);
    } catch (error) {
      setLoad(false);
      setErrorTitle(false);
      setErrorDes(false);
      setErrorPrice(false);

      // console.log(error.message);
    }
  };

  // console.log(newMenu, category, menuById);
  return (
    <>
      {load && <Spinner />}
      <div className='topLine'></div>
      <div className='mainContainer space-y-6  relative '>
        <PageNavigate to='/menu' title='Add new menu' />
        <div>
          <Input
            value={newMenu.title}
            label='Title'
            name='title'
            placeholder=''
            onChange={(e) => {
              handleChangeInput(e);
              setErrorTitle(false);
            }}
          />
          {errorTitle && (
            <p className='text-xs text-red-400 pt-1'>* Please enter title</p>
          )}
          <Input
            value={newMenu.description}
            label='Description'
            name='description'
            placeholder=''
            onChange={(e) => {
              handleChangeInput(e);
              setErrorDes(false);
            }}
          />
          {errorDes && (
            <p className='text-xs text-red-400 pt-1'>
              * Please enter description
            </p>
          )}
          <Input
            type='number'
            value={newMenu.price}
            label='Price'
            name='price'
            placeholder=''
            onChange={(e) => {
              handleChangeInput(e);
              setErrorPrice(false);
            }}
          />
          {errorPrice && (
            <p className='text-xs text-red-400 pt-1'>* Please enter price</p>
          )}
        </div>
        <select
          className='input'
          name='category'
          value={newMenu.category}
          onChange={(e) => handleChangeInput(e)}
        >
          {category.map((el) => (
            <option key={el.id} value={el.id}>
              {el.icon} {el.name}
            </option>
          ))}
        </select>
        <button
          className=' text-blue-400 text-sm'
          onClick={() => navigate("/add-new-category")}
        >
          + new category
        </button>
      </div>
      <button className='primary down ' onClick={handleSubmitMenu}>
        save
      </button>
    </>
  );
}
