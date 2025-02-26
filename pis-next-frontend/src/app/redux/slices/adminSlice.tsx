import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import positionApi from "@/app/api/api";

export const Login = createAsyncThunk(
  "admin/login",
  async (
    data: {
      userName: string;
      password: string;
    },
    thunkApi
  ) => {
    try {
      const response = await positionApi.login(data);
      console.log("Here", response);
      return response.data;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null as string | null,
  success: false,
  user: null,
  isLogged: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetSuccessState: (state) => {
      state.success = false;
    },

    resetErrorState: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccessState, resetErrorState } = adminSlice.actions;

export default adminSlice.reducer;
