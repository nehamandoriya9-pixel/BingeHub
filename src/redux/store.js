import { configureStore } from "@reduxjs/toolkit";
import tvReducer from "./tvSlice";
import darkReducer from "./darkModeSlice";
const store = configureStore({
  reducer: {
    BingeHub: tvReducer,
    darkMode: darkReducer,
  },
});

export default store;
