import React from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from "../../services/dateFormat";

export default function MenuCard({ el, category }) {
  const { OrderItems, createdAt, detail } = el;
  const navigate = useNavigate();
  const icon = category.filter((fl) => fl.id == OrderItems[0]?.category);

  return (
    <div
      onClick={() => navigate("/detail/" + el.id)}
      className='border border-gray-100 rounded-xl shadow-card flex p-4 gap-4 w-full'
    >
      <div className='bg-white shadow-card text-3xl p-2 rounded-lg '>
        {icon[0]?.icon}
      </div>
      <div className='w-[70%]'>
        <h1 className='text-base font-semibold'>{detail}</h1>
        <p className='text-sm text-gray-400'>{OrderItems?.length} Items</p>
      </div>
      <h1 className='text-base  text-main-400 w-[30%] text-right'>
        #{dateFormat(createdAt).toString().slice(23)}
      </h1>
    </div>
  );
}
