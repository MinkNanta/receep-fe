import { ChevronLeftIcon, PlusSmIcon } from "@heroicons/react/outline";
import Input from "../components/common/Input";
import MenuCard from "../components/common/MenuCard";
import PageNavigate from "../components/common/PageNavigate";

export default function AddNewOrder() {
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
  ];
  return (
    <div className='mainContainer space-y-6 border-t-2 border-main-400'>
      <PageNavigate title='Add new order' />
      <Input label='order detail' placeholder='Your order detail' />
      {cardItems.map((el) => (
        <MenuCard el={el} />
      ))}
      <div className=' outLine'>
        <PlusSmIcon className='w-5 h-5 text-main-400 m-auto' /> add more
      </div>
      <button className='primary bottom-6 fixed max-w-sm'>
        create new order
      </button>
    </div>
  );
}
