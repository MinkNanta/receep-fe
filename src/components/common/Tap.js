import React from "react";

export default function Tap({ active, setActive }) {
  const tapItems = ["upcoming", "done"];
  return (
    <div className='flex border p-1 rounded-3xl'>
      {tapItems.map((el) => (
        <div
          className={active === el ? "tapActive" : "tapInactive"}
          onClick={() => setActive(el)}
        >
          {el}
        </div>
      ))}
    </div>
  );
}
