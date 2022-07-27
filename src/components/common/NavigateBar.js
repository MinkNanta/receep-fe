import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigateBar() {
  const navigate = useNavigate();

  const menuItem = [
    { title: "home", icon: "🏠", to: "/main" },
    { title: "menu", icon: "📖", to: "/menu" },
    { title: "all order", icon: "🧾", to: "/order" },
    { title: "add order", icon: "🛎", to: "/add-order" },
  ];

  return (
    <div className='bg-white fixed bottom-0 w-screen py-4 px-6 flex justify-between shadow-2xl'>
      {menuItem.map((el) => (
        <div
          key={el.title}
          className='menuItem'
          onClick={() => navigate(el.to)}
        >
          <div>{el.icon}</div>
          <p>{el.title}</p>
        </div>
      ))}
    </div>
  );
}
