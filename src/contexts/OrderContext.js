import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../services/localStorage";
import axios from "../config/axios";
import { useNavigate } from "react-router";

const OrderContext = createContext();

function OrderContextProvider({ children }) {
  const [allOrder, setAllOrder] = useState([]);
  const [orderById, setOrderById] = useState({});
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({
    icon: "",
    name: "",
  });
  const navigate = useNavigate();

  const [newMenu, setNewMenu] = useState({
    category: "1",
    title: "",
    description: "",
    price: "",
  });

  const getAllOrder = async (body) => {
    try {
      const res = await axios.get("/order");
      setAllOrder(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getOrderById = async (id) => {
    try {
      const res = await axios.get(`/order/${id}`);
      setOrderById(res.data);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        getAllOrder,
        allOrder,
        getOrderById,
        orderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

function useOrder() {
  const ctx = useContext(OrderContext);
  return ctx;
}

export default OrderContextProvider;
export { useOrder, OrderContext };
