import { configureStore } from "@reduxjs/toolkit";
import positionSlice from "@/app/redux/slices/positionSlice";

const store = configureStore({
  reducer: {
    position: positionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
