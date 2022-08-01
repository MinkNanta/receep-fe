import { ChevronLeftIcon, PlusSmIcon } from "@heroicons/react/outline";
import axios from "../config/axios";
import { useState } from "react";
import Input from "../components/common/Input";
import OrderListCard from "../components/common/OrderListCard";
import PageNavigate from "../components/common/PageNavigate";
import SelectMenu from "./SelectMenu";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../contexts/OrderContext";
import Spinner from "../components/common/Spinner";

export default function AddNewOrder() {
  const [select, setSelect] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);
  const [errorMenu, setErrorMenu] = useState(false);

  const [oderDetail, setOderDetail] = useState("");
  const [oderMenus, setOderMenus] = useState([]);
  const [load, setLoad] = useState(false);

  const handleDelete = (idx) => {
    const newOrders = [...oderMenus];
    newOrders.splice(idx, 1);
    setOderMenus(newOrders);
  };

  const { getAllOrder } = useOrder();
  const totalPrice = oderMenus.reduce((acc, el) => {
    acc += el.price * 1;
    return acc;
  }, 0);
  const totalCup = oderMenus.reduce((acc, el) => {
    acc += el.totalItem * 1;
    return acc;
  }, 0);

  const navigate = useNavigate();

  const handelCreate = async () => {
    try {
      if (oderDetail == "") {
        setErrorDetail(true);
        return;
      }

      if (oderMenus.length < 1) {
        setErrorMenu(true);
        return;
      }
      setLoad(true);

      const body = {};
      body.detail = oderDetail;
      body.total = totalCup;
      body.orderItem = oderMenus;
      const res = await axios.post("/order/create", body);
      // console.log(res.data.order.id);
      getAllOrder();
      navigate(`/detail/${res.data.order.id}`);
      setLoad(false);
    } catch (error) {
      // console.log(error.message);
      setLoad(false);
    }
  };

  return (
    <>
      {load && <Spinner />}

      <div className='topLine'></div>
      {!select ? (
        <div className='mainContainer space-y-6 h-screen'>
          <PageNavigate title='Add new order' to='/' />
          <div className='border border-gray-100 rounded-xl shadow-card  p-4 gap-4 w-full active:bg-gray-100 space-y-3 h-[72%] overflow-auto'>
            <Input
              value={oderDetail}
              onChange={(e) => {
                setOderDetail(e.target.value);
                setErrorDetail(false);
              }}
              name='detail'
              label='order detail'
              placeholder=''
            />
            {errorDetail && (
              <p className='text-xs text-red-400'>* Please input the detail</p>
            )}
            {oderMenus.map((el, idx) => (
              <OrderListCard el={el} onClick={() => handleDelete(idx)} />
            ))}
            {!oderMenus.length ? (
              ""
            ) : (
              <div className='flex justify-between gap-4 items-center pb-2'>
                <p className='text-sm text-gray-400 '>Total</p>
                <p className='text-sm text-main-400 '>{totalPrice} THB</p>
              </div>
            )}

            <div
              className='outLineDashed'
              onClick={() => {
                setSelect(true);
                setErrorMenu(false);
              }}
            >
              <PlusSmIcon className='w-4 text-main-400 m-auto inline-flex mx-1' />
              add menu
            </div>
            {errorMenu && (
              <p className='text-xs text-red-400'>please select menu</p>
            )}
          </div>
          {/* <button className=' text-blue-400 text-sm '>+ more order</button> */}

          <button className='primary down ' onClick={handelCreate}>
            create order
          </button>
        </div>
      ) : (
        <SelectMenu
          select={select}
          setSelect={setSelect}
          oderMenus={oderMenus}
          setOderMenus={setOderMenus}
        />
      )}
    </>
  );
}
