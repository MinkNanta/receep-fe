import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderListCard({ el, onClick }) {
  const navigate = useNavigate();

  return (
    <div
      key={el.id}
      className='border-b border-gray-100 py-3  w-full flex active:bg-gray-100'
    >
      <div className='w-full'>
        <div className='flex justify-between w-full'>
          <h1 className='text-base font-semibold w-full'>
            {el.title} <span className='text-main-400'>X {el.totalItem}</span>
          </h1>
          <h1 className='text-base w-full text-main-400 text-right'>
            {el.price} THB
          </h1>
        </div>
        <div className='space-y-1'>
          <p className='text-sm text-gray-400'>{el.description}</p>

          <p className='text-sm text-gray-400'>sweet: {el.sweet}</p>

          {el.note && <p className='text-sm text-gray-400'>note: {el.note}</p>}

          <div className='flex  gap-1 item-end'>
            {/* <TrashIcon
              className=' text-gray-400 inline-flex h-4'
              onClick={onClick}
            /> */}
            <p
              className='text-[12px] text-orange-400 my-auto  underline'
              onClick={onClick}
            >
              delete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
