import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Загрузка состояния из localStorage
const loadWishListState = () => {
  try {
    const wishListData = localStorage.getItem("wishList");
    return wishListData ? JSON.parse(wishListData) : [];
  } catch (e) {
    console.error("Failed to load wishlist:", e);
    return [];
  }
};

// Сохранение состояния в localStorage
const saveWishListState = (wishList) => {
  try {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  } catch (e) {
    console.error("Failed to save wishlist:", e);
  }
};

const initialState = {
  items: loadWishListState(),
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    // Добавление товара в избранное
    addToWishList: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
        saveWishListState(state.items);
        
      } else {
        toast.info("Этот товар уже в избранном");
      }
    },

    
    removeFromWishList: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishListState(state.items);
      
    },

    
    clearWishList: (state) => {
      state.items = [];
      saveWishListState(state.items);
    },

    // Перемещение товара в корзину
    moveToCart: (state, action) => {
      const itemToMove = state.items.find(item => item.id === action.payload);
      if (itemToMove) {
        state.items = state.items.filter(item => item.id !== action.payload);
        saveWishListState(state.items);
        toast.success("Товар перемещен в корзину");
        return itemToMove; // Возвращаем товар для добавления в корзину
      }
    }
  },
});

export const { 
  addToWishList, 
  removeFromWishList, 
  clearWishList,
  moveToCart
} = wishListSlice.actions;

// Селектор для получения избранного
export const selectWishListItems = (state) => state.wishList.items;

export default wishListSlice.reducer;