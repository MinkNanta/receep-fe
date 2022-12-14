import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigateBar() {
  const navigate = useNavigate();

  const menuItem = [
    { title: "home", icon: "๐ ", to: "/" },
    { title: "new order", icon: "โ๏ธ", to: "/add-order" },
    { title: "menu", icon: "๐", to: "/menu" },
    // { title: "list", icon: "๐งพ", to: "/order" },
    { title: "user", icon: " ๐งโ๐ผ", to: "/user" },
  ];

  return (
    <div className='bg-white fixed bottom-0 w-screen py-4 px-6  shadow-2xl'>
      <div className='mainContainer flex justify-between'>
        {menuItem.map((el) => (
          <div key={el.to} className='menuItem' onClick={() => navigate(el.to)}>
            <div>{el.icon}</div>
            <p className='text-sm text-gray-600'>{el.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
