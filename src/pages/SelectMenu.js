import { PlusSmIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import MenuListCard from "../components/common/MenuListCard";
import PageNavigate from "../components/common/PageNavigate";
import { useMenu } from "../contexts/MenuContext";

export default function SelectMenu({
  select,
  setSelect,
  oderMenus,
  setOderMenus,
}) {
  const [tap, setTap] = useState(1);
  const [step, setStep] = useState(1);
  const { menu, getAllMenu, getAllCategory, category } = useMenu();

  const [aMenu, setAMenu] = useState({});
  const [detailMenu, setDetailMenu] = useState({
    sweet: "0%",
    note: "",
  });

  const [totalItem, setTotalItem] = useState(1);

  const sweetOption = ["100%", "75%", "50%", "25%", "0%"];
  // const [menudetail,setMenudetail] = useState({
  //   sweet: "",note: "",
  // })

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

  const item = {};

  const handleSelect = () => {
    aMenu.sweet = detailMenu.sweet;
    aMenu.note = detailMenu.note;
    aMenu.totalItem = totalItem;
    aMenu.price = aMenu.price * totalItem;

    const newOrders = [...oderMenus];
    newOrders.push(aMenu);
    setOderMenus(newOrders);
    setSelect(false);
  };

  return (
    <>
      {step === 1 && (
        <>
          <div
            className='mainContainer space-y-6 '
            onClick={() => setSelect(false)}
          >
            <PageNavigate title='menu list' />
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
                <MenuListCard
                  el={el}
                  onClick={() => {
                    item.category = el.category;
                    item.title = el.title;
                    item.description = el.description;
                    item.price = el.price;
                    setAMenu(item);
                    setStep(2);
                  }}
                />
              ))}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div
            className='mainContainer space-y-6 '
            onClick={() => {
              setStep(1);
              setDetailMenu({
                sweet: "0%",
                note: "",
              });
            }}
          >
            <PageNavigate title='Menu detail' />
          </div>
          <div className='mainContainer space-y-6 pt-6 '>
            <div>
              <label className='label'>Sweet</label>
              <select
                className='input'
                name='sweet'
                value={detailMenu.sweet}
                onChange={(e) =>
                  setDetailMenu((p) => ({ ...p, sweet: e.target.value }))
                }
              >
                {sweetOption.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>

              <Input
                value={detailMenu.note}
                label='Note'
                name='note'
                placeholder=''
                onChange={(e) =>
                  setDetailMenu((p) => ({ ...p, note: e.target.value }))
                }
              />
            </div>
            <div className='flex justify-center items-center gap-6'>
              <p className='w-full text-gray-400 text-sm'>Total</p>
              <div
                className='smallButton'
                onClick={() => {
                  if (totalItem > 1) setTotalItem((p) => p - 1);
                }}
              >
                -
              </div>
              <h1 className='text-2xl w-1/12 text-center'>{totalItem}</h1>

              <div
                className='smallButton'
                onClick={() => setTotalItem((p) => p + 1)}
              >
                +
              </div>
            </div>
            <button className='primary ' onClick={handleSelect}>
              save
            </button>
          </div>
        </>
      )}
    </>
  );
}
