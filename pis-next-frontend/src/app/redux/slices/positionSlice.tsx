import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import positionApi from "@/app/api/api";

export const CreateNewPosition = createAsyncThunk(
  "position/create",
  async (
    data: {
      name: string;
      description: string;
      parentPosition: string;
    },
    thunkApi
  ) => {
    try {
      const response = await positionApi.createPosition(data);
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const GetChoices = createAsyncThunk(
  "position/choices",
  async (_, thunkApi) => {
    try {
      const response = await positionApi.getChoices();
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  positions: [],
  loading: false,
  error: null as string | null,
  selectedPosition: null,
  success: false,
  choices: [],
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setSelectedPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },

    resetInitialState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateNewPosition.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateNewPosition.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateNewPosition.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) ?? "An error occurred";
      });

    builder
      .addCase(GetChoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetChoices.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.choices = action.payload;
      })
      .addCase(GetChoices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) ?? "An error occurred";
      });
  },
});

export const { setSelectedPosition, resetInitialState } = positionSlice.actions;

export default positionSlice.reducer;
