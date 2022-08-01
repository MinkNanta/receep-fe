import React from "react";

export default function Spinner() {
  return (
    <div className='bg-gray-900/70 absolute inset-0 z-50 h-full flex justify-center items-center'>
      <div className='p-6 bg-white rounded-3xl mx-auto text-center '>
        <div className='spinner2 mx-auto '></div>
        <p className='text-gray-600'>Loading...</p>
      </div>
    </div>
  );
}
