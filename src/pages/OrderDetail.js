import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigateBar from "../components/common/NavigateBar";
import PageNavigate from "../components/common/PageNavigate";
import { useOrder } from "../contexts/OrderContext";
import dateFormat from "../services/dateFormat";
import axios from "../config/axios";
import Loading from "../components/common/Loading";

export default function OrderDetail() {
  // const [status, setStatus] = useState("upcoming");
  const navigate = useNavigate();

  const { orderById, getOrderById } = useOrder();

  const { detail, createdAt, status, OrderItems } = orderById;

  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [load, setLoad] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoad((p) => !p);
        const res = await getOrderById(id);
        const totalPrice = await res.OrderItems.reduce((acc, el) => {
          acc += el.price * 1;
          return acc;
        }, 0);
        setTotalPrice(totalPrice);
        const totalItem = await res.total;
        setTotalItem(totalItem);
        setLoad(false);
      } catch (error) {
        console.log(error.message);
        setLoad(false);
      }
    };
    fetchUser();
  }, []);

  const handelUpdateStatus = async () => {
    try {
      if (orderById.status === "done") {
        return;
      }
      setLoadStatus(true);
      const res = await axios.patch("/order/update/" + id, { status: "done" });
      getOrderById(id);
      setLoadStatus(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(orderById);
  return (
    <>
      {load && <Loading />}
      <div className='topLine'></div>

      <div className='mainContainer space-y-4 '>
        <div className='flex justify-between mt-4 items-center'>
          <p className='text-gray-500'>Order detail</p>

          <button className='second' onClick={() => handelUpdateStatus()}>
            {loadStatus ? (
              <p className=' text-gray-400 '>⌛ updating...</p>
            ) : orderById.status === "upcoming" ? (
              "🧑🏼‍🍳 Done"
            ) : (
              "🛵 Send"
            )}
          </button>
        </div>
        <div>
          <h1 className='text-2xl font-semibold'>{detail}</h1>
          <p className='text-gray-500'>{dateFormat(createdAt)}</p>
        </div>
        <div className='divider'></div>
        {OrderItems?.map((el) => (
          <div className='divider'>
            <div className='flex justify-between'>
              <h1 className='text-2xl font-semibold'>
                {el.title}
                <span className='text-main-400'> X{el.totalItem}</span>
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
            <span className='text-main-400'> X {totalItem}</span>
          </p>
          <p className='text-base font-semibold text-main-400'>
            {totalPrice} THB
          </p>
        </div>
        <button className='w-full second down' onClick={() => navigate("/")}>
          home
        </button>
      </div>
    </>
  );
}
