import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("bikeDetailState");
    if (serializedState === null) return { currentDetail: null };
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return { currentDetail: null };
  }
};

const initialState = {
  ...loadFromLocalStorage(),
  loading: false,
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.currentDetail = action.payload;
      try {
        const serializedState = JSON.stringify({ currentDetail: state.currentDetail });
        localStorage.setItem("bikeDetailState", serializedState);
      } catch (e) {
        console.warn("Failed to save state to localStorage", e);
      }
    },
    clearDetail: (state) => {
      state.currentDetail = null;
      try {
        localStorage.removeItem("bikeDetailState");
      } catch (e) {
        console.warn("Failed to remove state from localStorage", e);
      }
    },
    updateDetail: (state, action) => {
      if (state.currentDetail) {
        state.currentDetail = { ...state.currentDetail, ...action.payload };
        try {
          const serializedState = JSON.stringify({ currentDetail: state.currentDetail });
          localStorage.setItem("bikeDetailState", serializedState);
        } catch (e) {
          console.warn("Failed to save updated state to localStorage", e);
        }
      }
    },
  },
});

export const { setDetail, clearDetail, updateDetail } = detailSlice.actions;
export default detailSlice.reducer;