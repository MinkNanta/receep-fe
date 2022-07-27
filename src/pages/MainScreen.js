import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuCard from "../components/common/MenuCard";
import NavigateBar from "../components/common/NavigateBar";
import Tap from "../components/common/Tap";
import Title from "../components/common/Title";
import dateFormat from "../services/dateFormat";

export default function MainScreen() {
  // Wed 26 Jan 2022
  const date = new Date();
  const [tap, setTap] = useState("upcoming");

  const cardItems = [
    {
      id: 1,
      title: "53/2902 ซ.17/5",
      item: "3",
      create: "09:30",
      icon: "🫖",
      status: "upcoming",
    },
    {
      id: 2,
      title: "53/2902 ซ.17/5",
      item: "2",
      create: "09:30",
      icon: "🎂",
      status: "upcoming",
    },
    {
      id: 3,
      title: "53/2902 ซ.17/5",
      item: "1",
      create: "09:30",
      icon: "🥃",
      status: "upcoming",
    },
    {
      id: 4,
      title: "53/2902 ซ.17/5",
      item: "3",
      create: "09:30",
      icon: "🍵",
      status: "upcoming",
    },
    {
      id: 5,
      title: "53/2902 ซ.17/5",
      item: "3",
      create: "09:30",
      icon: "🫖",
      status: "upcoming",
    },
    {
      id: 6,
      title: "53/2902 ซ.17/5",
      item: "2",
      create: "09:30",
      icon: "🎂",
      status: "upcoming",
    },
    {
      id: 7,
      title: "ffffff",
      item: "1",
      create: "09:30",
      icon: "🥃",
      status: "done",
    },
    {
      id: 8,
      title: "53/2902 ซ.17/5",
      item: "3",
      create: "09:30",
      icon: "🍵",
      status: "done",
    },
    {
      id: 9,
      title: "53/2902 ซ.17/5",
      item: "3",
      create: "09:30",
      icon: "🫖",
      status: "done",
    },
    {
      id: 10,
      title: "53/2902 ซ.17/5",
      item: "2",
      create: "09:30",
      icon: "🎂",
      status: "done",
    },
  ];

  return (
    <>
      <div className='sticky top-0 bg-white space-y-2'>
        <div className='mainContainer space-y-2 pb-6'>
          <Title title='Your' sub={dateFormat(date)} titleColor='Order' />
          <Tap active={tap} setActive={setTap} />
        </div>
      </div>
      <div className='mainContainer space-y-4'>
        {cardItems
          .filter((fl) => fl.status === tap)
          .map((el) => (
            <MenuCard el={el} />
          ))}
      </div>
      <NavigateBar />
    </>
  );
}
