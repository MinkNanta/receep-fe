import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigateBar() {
  const navigate = useNavigate();

  const menuItem = [
    { title: "home", icon: "🏠", to: "/" },
    { title: "new order", icon: "☕️", to: "/add-order" },
    { title: "menu", icon: "📖", to: "/menu" },
    // { title: "list", icon: "🧾", to: "/order" },
    { title: "user", icon: " 🧑‍💼", to: "/user" },
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
