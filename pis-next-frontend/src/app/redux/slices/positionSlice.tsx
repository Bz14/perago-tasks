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

export const GetPositions = createAsyncThunk(
  "position/positions",
  async (_, thunkApi) => {
    try {
      const response = await positionApi.getPositions();
      console.log("Here", response);
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const GetPositionById = createAsyncThunk(
  "position/position",
  async (id: string | any, thunkApi) => {
    try {
      const response = await positionApi.getPositionById(id);
      console.log(id, response.data);
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const UpdatePosition = createAsyncThunk(
  "position/update",
  async (
    {
      id,
      name,
      description,
    }: { id: string | any; name: string; description: string },
    thunkApi
  ) => {
    try {
      const response = await positionApi.updatePosition(id, {
        name,
        description,
      });
      console.log("Here", response);
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const DeletePosition = createAsyncThunk(
  "position/delete",
  async (id: string | any, thunkApi) => {
    try {
      const response = await positionApi.deletePositionById(id);
      console.log("Here", response);
      return response;
    } catch (error: Error | any) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

type OrgNode = {
  id: string;
  name: string;
  description: string;
  children?: OrgNode[];
};

interface PositionState {
  positions: OrgNode[];
  loading: boolean;
  error: string | null;
  position: any | null;
  success: boolean;
  choices: any[];
  message: string | null;
}

const initialState: PositionState = {
  positions: [],
  loading: false,
  error: null,
  position: null,
  success: false,
  choices: [],
  message: null,
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
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

    builder
      .addCase(GetPositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.positions = action.payload.data;
      })
      .addCase(GetPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(GetPositionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPositionById.fulfilled, (state, action) => {
        state.loading = false;
        state.position = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(GetPositionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(UpdatePosition.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdatePosition.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.position = {
          ...state.position,
          name: action.payload.data.name,
          description: action.payload.data.description,
        };
        const pos = state.positions.find(
          (p) => p.id === action.payload.data.id
        );
        if (pos) {
          pos.name = action.payload.name;
          pos.description = action.payload.description;
        }
      })
      .addCase(UpdatePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(DeletePosition.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeletePosition.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.position = null;
        const pos = state.positions.filter(
          (p) => p.id !== action.payload.data.id
        );
        state.positions = pos;
      })
      .addCase(DeletePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccessState, updateChoices, resetErrorState } =
  positionSlice.actions;

export default positionSlice.reducer;
