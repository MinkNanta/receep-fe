import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import MenuListCard from "../components/common/MenuListCard";
import PageNavigate from "../components/common/PageNavigate";

export default function MenuList() {
  const [tap, setTap] = useState("coffee");
  const categoryItem = [
    { id: 1, icon: "🥃", title: "coffee" },
    { id: 2, icon: "🥃", title: "non" },
    { id: 3, icon: "🥃", title: "drip" },
    { id: 4, icon: "🥃", title: "brew" },
    { id: 5, icon: "🥃", title: "bakery" },
    { id: 6, icon: "🥃", title: "all" },
  ];
  const cardItems = [
    {
      id: 1,
      title: "Aerocano",
      price: "60",
      description: "เอสเปรโซ่ เย็น",
      category: "coffee",
    },
    {
      id: 2,
      title: "Aerocano",
      price: "60",
      description: "เอสเปรโซ่ เย็น",
      category: "brew",
    },
    {
      id: 3,
      title: "Aerocano",
      price: "60",
      description: "เอสเปรโซ่ เย็น",
      category: "non",
    },
  ];
  return (
    <>
      <div className='mainContainer space-y-6 border-t-2 border-main-400'>
        <PageNavigate title='menu list'>
          <button className='second text-main-400 flex gap-2 items-center'>
            <PlusSmIcon className='w-4 h-4' /> new menu
          </button>
        </PageNavigate>
      </div>

      <div className='flex gap-3 w-full  whitespace-nowrap overflow-y-scroll pb-10 pt-4 max-w-sm px-4 mx-auto'>
        {categoryItem.map((el) => (
          <div
            className={`
              ${
                el.title === tap
                  ? "bg-main-400 shadow-button"
                  : "bg-white shadow-card"
              }
            rounded-full p-2  text-center basis-[25%]`}
            onClick={() => setTap(el.title)}
          >
            <div className='w-12 h-12 rounded-full bg-white'>
              <p className='text-2xl p-2'>{el.icon}</p>
            </div>
            <p
              className={`
              ${el.title === tap ? "text-white " : " text-gray-400"}
              text-sm  py-2`}
            >
              {el.title}
            </p>
          </div>
        ))}
      </div>
      <div className='mainContainer space-y-4'>
        {cardItems
          .filter((fl) => fl.category === tap)
          .map((el) => (
            <MenuListCard el={el} />
          ))}
      </div>
    </>
  );
}
