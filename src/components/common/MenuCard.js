import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuCard({ el }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/detail/" + el.id)}
      key={el.id}
      className='border border-gray-100 rounded-xl shadow-card flex p-4 gap-4 w-full'
    >
      <div className='bg-white shadow-card text-3xl p-2 rounded-lg '>
        {el.icon}
      </div>
      <div className='w-full'>
        <h1 className='text-base font-semibold'> {el.title}</h1>
        <p className='text-sm text-gray-400'>{el.item} Items</p>
      </div>
      <h1 className='text-base  text-main-400'>#{el.create}</h1>
    </div>
  );
}
