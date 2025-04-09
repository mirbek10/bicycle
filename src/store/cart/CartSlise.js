import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Загрузка состояния из localStorage
const loadStateFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    const ordersData = localStorage.getItem("orders");
    return {
      cartItems: cartData ? JSON.parse(cartData) : [],
      orders: ordersData ? JSON.parse(ordersData) : [],
    };
  } catch (e) {
    console.error("Failed to load state:", e);
    return {
      cartItems: [],
      orders: [],
    };
  }
};

// Сохранение состояния в localStorage
const saveStateToLocalStorage = (cartItems, orders) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("orders", JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
};

const initialState = loadStateFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину
    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    // Увеличение количества товара
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    // Уменьшение количества товара
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    // Удаление товара из корзины
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveStateToLocalStorage(state.cartItems, state.orders);
      toast.info("Товар удален из корзины");
    },

    // Очистка корзины
    clearCart: (state) => {
      state.cartItems = [];
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    // Оформление заказа
    checkout: (state) => {
      if (state.cartItems.length === 0) {
        toast.error("Корзина пуста");
        return;
      }

      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: [...state.cartItems],
        total: state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      state.orders.unshift(newOrder); // Добавляем новый заказ в начало массива
      state.cartItems = [];
      saveStateToLocalStorage(state.cartItems, state.orders);
      toast.success("Заказ оформлен успешно!");
    },

    // Очистка истории заказов
    clearOrders: (state) => {
      state.orders = [];
      saveStateToLocalStorage(state.cartItems, state.orders);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  checkout,
  clearOrders,
} = cartSlice.actions;

export default cartSlice.reducer;