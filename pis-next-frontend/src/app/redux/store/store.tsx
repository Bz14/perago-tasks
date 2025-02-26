import { configureStore } from "@reduxjs/toolkit";
import positionSlice from "@/app/redux/slices/positionSlice";
import adminSlice from "@/app/redux/slices/adminSlice";

const store = configureStore({
  reducer: {
    position: positionSlice,
    admin: adminSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
