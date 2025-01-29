import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reporterService from "../services/reporter/reporter";
import { objectId, reporter } from "../../types/type";
type obj = reporter & objectId;
const initialState: {
  game: reporter | null;
  games: reporter[];
  loading: boolean;
  error: string | null;
  success: boolean;
} = {
  game: null,
  games: [],
  loading: false,
  error: null,
  success: false,
};
export const addReporter = createAsyncThunk(
  "addReporter",
  async (row: reporter, api) => {
    try {
      return await reporterService.createReporter(row);
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const fetchReporters = createAsyncThunk(
  "fetchReporters",
  async (keyword: { code: string; par: string }, api) => {
    try {
      const games = await reporterService.getReporters(keyword);
      return games as reporter[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const fetchReporter = createAsyncThunk(
  "fetchReporter",
  async (_, api) => {
    try {
      return await reporterService.getReporter();
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);

export const removeReporter = createAsyncThunk(
  "removeReporter",
  async (id: string, api) => {
    try {
      return await reporterService.deleteReporter(id);
    } catch (error) {
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const editReporter = createAsyncThunk(
  "editReporter",
  async (row: obj, api) => {
    try {
      return await reporterService.updateReporter(row);
    } catch (error) {
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const reporterSlice = createSlice({
  name: "reporter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReporter.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReporter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(addReporter.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload as reporter;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchReporter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReporter.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReporter.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload as reporter;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchReporters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReporters.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReporters.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(removeReporter.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeReporter.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeReporter.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(editReporter.pending, (state) => {
        state.loading = true;
      })
      .addCase(editReporter.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editReporter.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
        state.success = true;
        state.error = null;
      });
  },
});
export default reporterSlice.reducer;
