import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuListCard from "../components/common/MenuListCard";
import PageNavigate from "../components/common/PageNavigate";
import { useMenu } from "../contexts/MenuContext";

export default function MenuList() {
  const [tap, setTap] = useState(1);
  const { menu, getAllMenu, getAllCategory, category } = useMenu();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        getAllMenu();
        getAllCategory();
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  console.log(menu, category);

  return (
    <>
      <div className='topLine'></div>

      <div className='mainContainer space-y-6 '>
        <PageNavigate to='/' title='menu list'>
          <button
            className='second text-main-400 flex gap-2 items-center'
            onClick={() => navigate("/create-menu")}
          >
            <PlusSmIcon className='w-4 h-4' /> new menu
          </button>
        </PageNavigate>
      </div>

      <div className='flex gap-3 w-full  whitespace-nowrap overflow-y-scroll pb-10 pt-4 max-w-sm px-4 mx-auto'>
        {category.map((el) => (
          <div
            key={el.id}
            className={`
              ${
                el.id === tap
                  ? "bg-main-400 shadow-button"
                  : "bg-white shadow-card"
              }
            rounded-full p-2 text-center  cursor-pointer`}
            onClick={() => setTap(el.id)}
          >
            <div className='w-12 h-12 rounded-full bg-white'>
              <p className='text-2xl p-2'>{el.icon}</p>
            </div>
            <p
              className={`
              ${el.id === tap ? "text-white " : " text-gray-400"}
              text-sm  py-2`}
            >
              {el.name}
            </p>
          </div>
        ))}
      </div>
      <div className='mainContainer space-y-4'>
        {menu
          .filter((fl) => fl.category == tap)
          .map((el) => (
            <MenuListCard el={el} />
          ))}
      </div>
    </>
  );
}
