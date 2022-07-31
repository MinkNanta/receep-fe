import { ChevronLeftIcon, PlusSmIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNavigate({ title, children, to }) {
  const navigate = useNavigate();

  return (
    <div className='flex gap-4 mt-6 items-end justify-between'>
      <div className='flex gap-4 mt-6 items-center'>
        <div
          className='shadow-card rounded-2xl border border-gray-100 p-2'
          onClick={() => navigate(to)}
        >
          <ChevronLeftIcon className='w-5 h-5 text-gray-400' />
        </div>
        <p className='text-gray-900 text-lg'>{title}</p>
      </div>
      {children}
    </div>
  );
}
