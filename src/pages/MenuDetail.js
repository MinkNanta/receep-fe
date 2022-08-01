import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input";
import PageNavigate from "../components/common/PageNavigate";
import { useMenu } from "../contexts/MenuContext";
import axios from "../config/axios";
import Spinner from "../components/common/Spinner";

export default function MenuDetail() {
  const { getAllCategory, category, setMenuById, menuById } = useMenu();
  const [load, setLoad] = useState(false);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDes, setErrorDes] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [newMenu, setNewMenu] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/menu/getMenuById/${id}`);
        // setMenuDetail(res.data);
        setNewMenu(res.data);
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleChangeInput = (event) => {
    setChange(true);
    const values = { ...newMenu };
    values[event.target.name] = event.target.value;
    setNewMenu(values);
  };

  const handleUpdate = async () => {
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

      const res = await axios.patch(`/menu/updateMenu/${id}`, newMenu);
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
  const handleDelete = async () => {
    try {
      console.log(id);
      setLoad(true);

      await axios.delete(`/menu/${id}`);
      navigate("/menu");
      setLoad(false);
    } catch (error) {
      setLoad(false);

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
        <div className='mt-4 space-y-6'>
          {change ? (
            <button className='primary' onClick={handleUpdate}>
              save
            </button>
          ) : (
            <button className='primary' disabled onClick={handleUpdate}>
              save
            </button>
          )}
        </div>
        <button className='outLine' onClick={handleDelete}>
          delete
        </button>
      </div>
    </>
  );
}
