import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import MenuCard from "../components/common/MenuCard";
import NavigateBar from "../components/common/NavigateBar";
import Tap from "../components/common/Tap";
import Title from "../components/common/Title";
import { useMenu } from "../contexts/MenuContext";
import { useOrder } from "../contexts/OrderContext";
import dateFormat from "../services/dateFormat";

export default function MainScreen() {
  // Wed 26 Jan 2022
  const date = new Date();
  const [tap, setTap] = useState("upcoming");
  const { allOrder, getAllOrder } = useOrder();
  const { category, getAllCategory } = useMenu();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoad(true);
        getAllOrder();
        getAllCategory();
        setLoad(false);
      } catch (error) {
        console.log(error.message);
        setLoad(false);
      }
    };
    fetchUser();
  }, []);

  console.log(allOrder, category);

  return (
    <>
      {load && <Loading />}

      <div className='sticky top-0 bg-white space-y-2'>
        <div className='mainContainer space-y-2 pb-6'>
          <Title title='Your' sub={dateFormat(date)} titleColor='Order' />
          <Tap active={tap} setActive={setTap} />
        </div>
      </div>
      <div className='mainContainer space-y-4'>
        {allOrder
          .filter((fl) => fl.status === tap)
          .map((el) => (
            <MenuCard el={el} category={category} />
          ))}
      </div>
      <NavigateBar />
    </>
  );
}
