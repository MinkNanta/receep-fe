import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import PageNavigate from "../components/common/PageNavigate";
import { useMenu } from "../contexts/MenuContext";
import axios from "../config/axios";

export default function AddNewMenu() {
  const {
    getAllCategory,
    category,
    setMenuById,
    menuById,
    newMenu,
    setNewMenu,
  } = useMenu();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        getAllCategory();
      } catch (error) {
        console.log(error.message);
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
      const res = await axios.post("/menu/create", newMenu);
      setMenuById(res.data);
      navigate("/detail/" + res.data.menu.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(newMenu, category, menuById);
  return (
    <>
      <div className='topLine'></div>
      <div className='mainContainer space-y-6  relative '>
        <PageNavigate to='/menu' title='Add new menu' />
        <div>
          <Input
            value={newMenu.title}
            label='Title'
            name='title'
            placeholder=''
            onChange={(e) => handleChangeInput(e)}
          />
          <Input
            value={newMenu.description}
            label='Description'
            name='description'
            placeholder=''
            onChange={(e) => handleChangeInput(e)}
          />
          <Input
            type='number'
            value={newMenu.price}
            label='Price'
            name='price'
            placeholder=''
            onChange={(e) => handleChangeInput(e)}
          />
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
