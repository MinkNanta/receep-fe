import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import MainScreen from "../pages/MainScreen";
import OrderDetail from "../pages/OrderDetail";
import AllOrderDetail from "../pages/AllOrderDetail";
import AddNewOrder from "../pages/AddNewOrder";
import MenuList from "../pages/MenuList";
import AddNewMenu from "../pages/AddNewMenu";
import AddNewCategory from "../pages/AddNewCategory";
import { useAuth } from "../contexts/AuthContext";
import User from "../pages/User";

export default function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      {user ? (
        <>
          <Route path='/' element={<MainScreen />} />
          <Route path='/order' element={<AllOrderDetail />} />
          <Route path='/detail/:id' element={<OrderDetail />} />
          <Route path='/menu' element={<MenuList />} />
          <Route path='/add-order' element={<AddNewOrder />} />
          <Route path='/create-menu' element={<AddNewMenu />} />
          <Route path='/add-new-category' element={<AddNewCategory />} />
          <Route path='/user' element={<User />} />
          <Route path='*' element={<MainScreen />} />
        </>
      ) : (
        <>
          <Route path='/' element={<SignIn />} />
          <Route path='*' element={<SignIn />} />
        </>
      )}
    </Routes>
  );
}
