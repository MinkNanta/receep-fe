import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import MainScreen from "../pages/MainScreen";
import OrderDetail from "../pages/OrderDetail";
import AllOrderDetail from "../pages/AllOrderDetail";
import AddNewOrder from "../pages/AddNewOrder";
import MenuList from "../pages/MenuList";
import AddNewMenu from "../pages/AddNewMenu";
import AddNewCategory from "../pages/AddNewCategory";

export default function Router() {
  const user = true;
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      {user ? (
        <>
          <Route path='/main' element={<MainScreen />} />
          <Route path='/order' element={<AllOrderDetail />} />
          <Route path='/detail/:id' element={<OrderDetail />} />
          <Route path='/menu' element={<MenuList />} />
          <Route path='/add-order' element={<AddNewOrder />} />
          <Route path='/add-new-menu' element={<AddNewMenu />} />
          <Route path='/add-new-category' element={<AddNewCategory />} />
        </>
      ) : (
        <Route path='*' element={<SignIn />} />
      )}
    </Routes>
  );
}
