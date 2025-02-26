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
      console.log("Here", response);
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const GetChoices = createAsyncThunk(
  "position/choices",
  async (_, thunkApi) => {
    try {
      const response = await positionApi.getChoices();
      return response.data;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

interface PositionState {
  positions: any[];
  loading: boolean;
  error: string | null;
  selectedPosition: any | null;
  success: boolean;
  choices: any[];
}

const initialState: PositionState = {
  positions: [],
  loading: false,
  error: null,
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

    updateChoices: (state, action) => {
      state.choices = [...state.choices, action.payload];
    },

    resetSuccessState: (state) => {
      state.success = false;
    },

    resetErrorState: (state) => {
      state.error = null;
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
        state.error = action.payload as string;
      });

    builder
      .addCase(GetChoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetChoices.fulfilled, (state, action) => {
        state.loading = false;
        state.choices = action.payload;
      })
      .addCase(GetChoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedPosition,
  resetSuccessState,
  updateChoices,
  resetErrorState,
} = positionSlice.actions;

export default positionSlice.reducer;
