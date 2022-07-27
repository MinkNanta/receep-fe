import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuListCard({ el }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/detail/" + el.id)}
      key={el.id}
      className='border border-gray-100 rounded-xl shadow-card flex p-4 gap-4 w-full active:bg-gray-100'
    >
      {/* <div className='bg-white shadow-card text-3xl p-2 rounded-lg '>
        {el.icon}
      </div> */}
      <div className='w-full'>
        <h1 className='text-base font-semibold'> {el.title}</h1>
        <p className='text-sm text-gray-400'>{el.description}</p>
      </div>
      <h1 className='text-base w-full text-main-400 text-right'>
        {el.price} THB
      </h1>
    </div>
  );
}
