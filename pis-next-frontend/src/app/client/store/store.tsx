import { configureStore } from "@reduxjs/toolkit";
import { positionApi } from "@/app/redux/slices/positionSlice";
import { adminApi } from "../slices/adminSlice";

const store = configureStore({
  reducer: {
    [positionApi.reducerPath]: positionApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(positionApi.middleware)
      .concat(adminApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
