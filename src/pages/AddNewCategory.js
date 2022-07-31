import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import PageNavigate from "../components/common/PageNavigate";
import axios from "../config/axios";
import { useMenu } from "../contexts/MenuContext";

export default function AddNewCategory() {
  const { getAllCategory, newCategory, setNewCategory, setNewMenu } = useMenu();
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const values = { ...newCategory };
    values[event.target.name] = event.target.value;
    setNewCategory(values);
  };

  const handleSubmitCategory = async () => {
    try {
      const res = await axios.post("/menu/createCategory", newCategory);

      console.log(res.data.category);
      getAllCategory();
      setNewMenu((p) => ({ ...p, category: res.data.category.id }));
      navigate("/create-menu");
      setNewCategory({
        icon: "",
        name: "",
      });
    } catch (error) {
      setNewCategory({
        icon: "",
        name: "",
      });
      console.log(error.message);
    }
  };

  console.log(newCategory);
  return (
    <>
      <div className='topLine'></div>
      <div className='mainContainer space-y-6 relative'>
        <PageNavigate to='/create-Category' title='Add new category' />
        <div>
          <Input
            value={newCategory.icon}
            label='Icon'
            name='icon'
            placeholder=''
            onChange={(e) => handleChangeInput(e)}
          />
          <Input
            value={newCategory.name}
            label='Name'
            name='name'
            placeholder=''
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
      </div>
      <button className='primary down' onClick={handleSubmitCategory}>
        save
      </button>
    </>
  );
}
