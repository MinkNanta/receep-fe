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
        // console.log(error.message);
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
      // console.log(error.message);
    }
  };

  // console.log(orderById);
  return (
    <>
      {load && <Loading />}
      {/* <div className='topLine'></div> */}
      <div className='mainContainer space-y-4 pt-6 pb-12'>
        <div className='flex justify-between items-center'>
          <p className='text-gray-500' onClick={() => navigate("/")}>
            {"<"} Order detail
          </p>

          <button className='second' onClick={() => handelUpdateStatus()}>
            {loadStatus ? (
              <p className=' text-gray-400 '>⌛ updating...</p>
            ) : orderById.status === "upcoming" ? (
              <p className='text-gray-400'>order</p>
            ) : (
              "🛵 Send"
            )}
          </button>
        </div>
        <div>
          <img
            src='https://lh3.googleusercontent.com/fife/AAbDypAOEizJwMVUZiW9qAmStf94Tq2SUR8kANIZplBNQG-DkObG2r0c2IR29cYrcw1MmClXYsBElh_TiTkYQ5JuziRyxGVb6knrH2ha6_9l2asmQ-OfChuhwSNJWozQuxnIRB-E-0kfNbx9FV4leIgXiRz0D86vBltQDEg_S_m-W-NZTC5Jf7SBcsQSum54QJ6ZSaIFJ7m-ECUux3QHJdH7YNmtIaRIQEDDhjGJk0z1vMMMjRM7s-NWVtekgyA_6jD-IMruq3oVDK9PlsbiItLCRAUEOd9pP3A6eXtmdIDpPnjwqHOXgKtzb1dEX8AukrodnpidPLInFXOMZjLXYx8LqAbXuXFtSO0GQU2DF3KLqSbBKwqsDdrS2qqUGxJhvk8PfmNNQfzcykk_3EUGkm4rwhFKLE1eIy92fKbv2wyMK7I7st6Kes-0P1l7__8YkY0MAFwd_a8WCP1MSri_ZG0CBbxetJowD_vZisk5bglrpUOwZYqFsskjLc8wQ4dMKK0LV5dvJclcpKvRHdb3yp5Uihl8zhRf_RzNwzGWKuLhDMnOLi7ZHLdVlRtmrkRolIZR4emQs1mribtndzZLX6NZ8hyjP7pE6YzgTZGEAnLKEYCndrW_8KCDUeWjED1nqF_8xmpzof8UjxUSKTEuCZduVkFYSSUbZ7xuRVUcKHmAUaQ0gY1-BdCQL37U-lb-pYHnDK7JRANBd0j6V4Aj1UXSe9lhJm6I71dF9xOHtjtDgSe4FwY5um8YXdPS6CLzEuElhIs9wow0hqyh-JPAWlJTg-Xo0rZDPI0WpuDKGC3wZYsuz50pCBflyVoAGTXu2_yHvgdylgfNzRSJmrkwoAXzPgI-z2u7PWtU0WFCqLZyaRLb3umFtImJp2r4i7UV29DCEQwcjub295pWjM5OMCUXJp0j_Fkr5SDp0LkQ1fdA6gDtIiyaxLssZFRSEI0Gjkk0njjBnXZCG_fCgFZ9gwQKu_Q3God09HPt84GYe_OEVxV3B-Bjt3zd0wvJkRBUQuS43JDoYJp22rOMFLz0CALF-DvpyD-wNxOWsQbB8-oJGbKtQKtHuV4owlkUhxYo8J-axfTSxIThYIPwC-BDD_cqRyAP0HSDamwixucE5_XnsNsSQu5au4h4VK6kI9JU-B6QV5n-YUquGMgrxqq1f3taLPkoni5ZrIMLyJk1EHuPuep-OiRAxEf8ZZFYwwqt5ilGQPmeVyV301DqSybYbj84BT6BX4Lmcb-A01_SSKhD4Nn5ZlnoOPACOzzVcqqukrgiEyWo19db-Q=w2270-h1474'
            className='h-[180px] m-auto p-4'
          />
          <h1 className='text-3xl font-semibold text-center w-full'>
            {detail}
          </h1>
          <p className='text-[22px] text-gray-500 text-center'>
            {dateFormat(createdAt)}
          </p>
        </div>
        <div className='divider'></div>
        {OrderItems?.map((el) => (
          <div className='divider' key={el.id}>
            <div className='grid grid-cols-4  gap-4 w-full items-start'>
              <h1 className='text-[28px] font-semibold w-full col-span-3 '>
                {el.title}
                <span className='text-main-400'> X{el.totalItem}</span>
              </h1>
              <p className='text-[22px] font-semibold self-end text-main-400 w-full h-full text-right'>
                {el.price} ฿
              </p>
            </div>
            <p className='text-lg'>sweet: {el.sweet}</p>
            {el.note && <p className='text-lg'>note: {el.note}</p>}
            <div className='h-4'></div>
          </div>
        ))}
        <div className='flex justify-between'>
          <p className='text-[22px] font-semibold'>
            Total
            <span className='text-main-400'> X {totalItem}</span>
          </p>
          <p className='text-[22px] font-semibold text-main-400'>
            {totalPrice} ฿
          </p>
        </div>
      </div>
    </>
  );
}
