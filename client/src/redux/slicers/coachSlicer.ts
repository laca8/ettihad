import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import coachService from "../services/sport/coach";
import { objectId, coach } from "../../types/type";
type obj = coach & objectId
const initialState: {
  game: coach | null,
  games: coach[],
  loading: boolean,
  error: string | null,
  success: boolean,
} = {
  game: null,
  games: [],
  loading: false,
  error: null,
  success: false,
};
export const addCoach = createAsyncThunk("addCoach", async (row:coach, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await coachService.createCoach(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchCoaches = createAsyncThunk("fetchCoaches", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await coachService.getCoachs(keyword)
      return games as coach[];
    } catch (error) {
       console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchCoach = createAsyncThunk("fetchCoach", async (_, api) => {
  try {
    return await coachService.getCoach();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeCoach = createAsyncThunk("removeCoach", async (id:string, api) => {
  try {
    return await coachService.deleteCoach(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editCoach = createAsyncThunk("editCoach", async (row:obj, api) => {
  try {
    return await coachService.updateCoach(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoach.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addCoach.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as coach;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoach.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchCoach.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as coach);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchCoaches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoaches.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchCoaches.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCoach.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeCoach.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editCoach.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCoach.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editCoach.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default coachSlice.reducer;
