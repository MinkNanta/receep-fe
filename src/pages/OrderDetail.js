import React, { useState } from "react";

export default function OrderDetail() {
  const [status, setStatus] = useState("upcoming");
  const menuDetails = [
    {
      id: "1",
      menuName: "Black lemon soda",
      sweet: "100%",
      note: "",
      price: "120",
    },
    {
      id: "2",
      menuName: "Aerocano",
      sweet: "0%",
      note: "No ice",
      price: "120",
    },
  ];
  return (
    <div className='mainContainer space-y-4 border-t-2 border-main-400'>
      <div className='flex justify-between mt-4 items-center'>
        <p className='text-gray-500'>Order detail</p>

        <button className='second' onClick={() => setStatus("done")}>
          {status === "upcoming" ? "🧑🏼‍🍳 Roger!" : "🛵 done"}
        </button>
      </div>
      <div>
        <h1 className='text-2xl font-semibold'>53/2902 ซ.17/5</h1>
        <p className='text-gray-500'>Wed 26 Jan 2022</p>
      </div>
      <div className='divider'></div>
      {menuDetails.map((el) => (
        <div className='divider'>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-semibold'>
              {el.menuName}
              <span className='text-main-400'> X1</span>
            </h1>
            <p className='text-base font-semibold self-end text-main-400'>
              {el.price} THB
            </p>
          </div>
          <p>sweet: {el.sweet}</p>
          {el.note && <p>note: {el.note}</p>}
          <div className='h-4'></div>
        </div>
      ))}
      <div className='flex justify-between'>
        <p className='text-base font-semibold'>
          Total
          <span className='text-main-400'> X1</span>
        </p>
        <p className='text-base font-semibold text-main-400'>240 THB</p>
      </div>
    </div>
  );
}
