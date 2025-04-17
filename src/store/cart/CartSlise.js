import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveStateToLocalStorage(state.cartItems, state.orders);
      toast.info("Товар удален из корзины");
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveStateToLocalStorage(state.cartItems, state.orders);
    },

    // Обновленный метод для оформления заказа
    checkout: (state, action) => {
      let itemsToCheckout = [];
      let orderTotal = 0;
      
      // Если переданы данные для покупки в один клик
      if (action.payload && action.payload.items) {
        itemsToCheckout = action.payload.items;
        orderTotal = action.payload.total;
      } 
      // Иначе оформляем текущую корзину
      else if (state.cartItems.length > 0) {
        itemsToCheckout = [...state.cartItems];
        orderTotal = state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      } 
      // Если нет ни корзины, ни переданных товаров
      else {
        toast.error("Нет товаров для оформления");
        return;
      }

      const newOrder = {
        id: action.payload?.orderNumber || Date.now().toString(),
        date: new Date().toISOString(),
        items: itemsToCheckout,
        total: orderTotal,
        customer: action.payload?.customer || null,
        status: "В обработке"
      };

      state.orders.unshift(newOrder);
      
      // Очищаем корзину только если оформляем её, а не покупку в один клик
      if (!action.payload) {
        state.cartItems = [];
      }
      
      saveStateToLocalStorage(state.cartItems, state.orders);
      toast.success(`Заказ №${newOrder.id} оформлен успешно!`);
    },

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