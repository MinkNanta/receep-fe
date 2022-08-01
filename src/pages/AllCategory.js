import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import MenuListCard from "../components/common/MenuListCard";
import PageNavigate from "../components/common/PageNavigate";
import { useMenu } from "../contexts/MenuContext";
import axios from "../config/axios";
import Spinner from "../components/common/Spinner";

export default function AllCategory() {
  const [tap, setTap] = useState(1);
  const { menu, getAllMenu, getAllCategory, category, setNewMenu } = useMenu();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoad(true);
      getAllMenu();
      const res = await getAllCategory();
      setTap(res[0].id);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      // console.log(error.message);
    }
  };
  const handleDelete = async (cateId) => {
    try {
      console.log(cateId);
      setLoad(true);

      await axios.delete(`/menu/deleteCategory/${cateId}`);
      // navigate("/menu");
      fetchUser();
      setLoad(false);
    } catch (error) {
      setLoad(false);

      // console.log(error.message);
    }
  };

  return (
    <>
      {load && <Spinner />}
      <div className='topLine'></div>

      <div className='mainContainer space-y-6 '>
        <PageNavigate to='/' title='Category list' />

        <div className=''>
          {category?.length === 0 ? (
            <button
              className='outLineDashed py-8'
              onClick={() => navigate("/add-new-category")}
            >
              <span className='text-main-400'>📝 step 1. </span>create category
            </button>
          ) : (
            category?.map((el) => (
              <div
                key={el.id}
                className='flex shadow-card items-center border border-gray-100 px-6 rounded-2xl mb-4'
                onClick={() => setTap(el.id)}
              >
                <div className='w-12 h-12 rounded-full bg-white'>
                  <p className='text-2xl p-2'>{el.icon}</p>
                </div>
                <p
                  className='text-gray-900
                  text-sm  py-2 w-full'
                >
                  {el.name}
                </p>
                <p
                  className='text-gray-400
              text-sm  py-2 underline'
                  onClick={() => handleDelete(el.id)}
                >
                  delete
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
