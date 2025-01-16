import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lectureService from "../services/lecture/lecture";
import { objectId, lecture } from "../../types/type";
type obj = lecture & objectId;
const initialState: {
  game: lecture | null;
  games: lecture[];
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
export const addLecture = createAsyncThunk(
  "addLecture",
  async (row: lecture, api) => {
    try {
      return await lectureService.createLecture(row);
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const fetchLectures = createAsyncThunk(
  "fetchLectures",
  async (keyword: { code: string; par: string }, api) => {
    try {
      const games = await lectureService.getLectures(keyword);
      return games as lecture[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const fetchLecture = createAsyncThunk("fetchLecture", async (_, api) => {
  try {
    return await lectureService.getLecture();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue(
      (error as { response: { data: { message: string } } })?.response?.data
        ?.message
    );
  }
});

export const removeLecture = createAsyncThunk(
  "removeLecture",
  async (id: string, api) => {
    try {
      return await lectureService.deleteLecture(id);
    } catch (error) {
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const editLecture = createAsyncThunk(
  "editLecture",
  async (row: obj, api) => {
    try {
      return await lectureService.updateLecture(row);
    } catch (error) {
      return api.rejectWithValue(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message
      );
    }
  }
);
export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLecture.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload as lecture;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLecture.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload as lecture;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(removeLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeLecture.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(editLecture.pending, (state) => {
        state.loading = true;
      })
      .addCase(editLecture.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
        state.success = true;
        state.error = null;
      });
  },
});
export default lectureSlice.reducer;
