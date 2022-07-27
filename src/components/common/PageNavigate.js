import { ChevronLeftIcon, PlusSmIcon } from "@heroicons/react/outline";
import React from "react";

export default function PageNavigate({ title, children }) {
  return (
    <div className='flex gap-4 mt-6 items-end justify-between'>
      <div className='flex gap-4 mt-6 items-center'>
        <a
          className='shadow-card rounded-2xl border border-gray-100 p-2'
          href='/main'
        >
          <ChevronLeftIcon className='w-5 h-5 text-gray-400' />
        </a>
        <p className='text-gray-900 text-lg'>{title}</p>
      </div>
      {children}
    </div>
  );
}
