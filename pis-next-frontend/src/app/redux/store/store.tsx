import { configureStore } from "@reduxjs/toolkit";
import { positionApi } from "@/app/redux/slices/positionSlice";
import adminSlice from "@/app/redux/slices/adminSlice";

const store = configureStore({
  reducer: {
    [positionApi.reducerPath]: positionApi.reducer,
    admin: adminSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(positionApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
