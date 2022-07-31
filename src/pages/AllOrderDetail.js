import React from "react";
import { useNavigate } from "react-router-dom";
import OrderListCard from "../components/common/OrderListCard";
import { useOrder } from "../contexts/OrderContext";
import dateFormat from "../services/dateFormat";

export default function AllOrderDetail() {
  const { allOrder } = useOrder();
  console.log(allOrder);
  const navigate = useNavigate();
  return (
    <>
      {allOrder
        .filter((fl) => fl.status === "upcoming")
        .map((el, idx) => (
          // <OrderListCard el={el} onClick={() => {}} />
          <div className='mainContainer space-y-4 mb-6 border-t-2 border-main-400 '>
            <div className='flex justify-between mt-4 items-center'>
              <p className='text-gray-500'>Order detail</p>
            </div>
            <div>
              <h1 className='text-2xl font-semibold'>{el.detail}</h1>
              <p className='text-gray-500'>{dateFormat(el.createdAt)}</p>
            </div>
            <div className='divider'></div>
            {el.OrderItems?.map((elOi) => (
              <div className='divider'>
                <div className='flex justify-between'>
                  <h1 className='text-2xl font-semibold'>
                    {elOi.title}
                    <span className='text-main-400'> X{elOi.totalItem}</span>
                  </h1>
                  <p className='text-base font-semibold self-end text-main-400'>
                    {elOi.price} THB
                  </p>
                </div>
                <p>sweet: {elOi.sweet}</p>
                {elOi.note && <p>note: {elOi.note}</p>}
                <div className='h-4'></div>
              </div>
            ))}
            <div className='flex justify-between'>
              <p className='text-base font-semibold'>
                Total
                <span className='text-main-400'> X {el.totalItem}</span>
              </p>
              <p className='text-base font-semibold text-main-400'>
                {el.totalPrice} THB
              </p>
            </div>
          </div>
        ))}
      <button
        className='underline text-gray-400 text-center w-full p-4'
        onClick={() => navigate("/")}
      >
        home
      </button>
    </>
  );
}
