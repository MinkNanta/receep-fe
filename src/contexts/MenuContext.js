import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../services/localStorage";
import axios from "../config/axios";
import { useNavigate } from "react-router";

const MenuContext = createContext();

function MenuContextProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [menuById, setMenuById] = useState([]);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState({
    icon: "",
    name: "",
  });
  const navigate = useNavigate();

  const [newMenu, setNewMenu] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
  });

  const getAllMenu = async (body) => {
    try {
      const res = await axios.get("/menu");
      setMenu(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllCategory = async (body) => {
    try {
      const res = await axios.get("/menu/getCategory");
      setNewMenu((p) => ({ ...p, category: res.data[0]?.id }));
      setCategory(res.data);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        getAllMenu,
        menu,
        category,
        getAllCategory,
        menuById,
        setMenuById,
        newMenu,
        setNewMenu,
        newCategory,
        setNewCategory,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function useMenu() {
  const ctx = useContext(MenuContext);
  return ctx;
}

export default MenuContextProvider;
export { useMenu, MenuContext };
