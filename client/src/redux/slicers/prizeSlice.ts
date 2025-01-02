import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import prizeService from "../services/sport/prize";
import { objectId, prize } from "../../types/type";
type obj = prize & objectId
const initialState: {
  game: prize | null,
  games: prize[],
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
export const addPrize = createAsyncThunk("addPrize", async (row:prize, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await prizeService.createPrize(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchPrizes = createAsyncThunk("fetchPrizes", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await prizeService.getPrizes(keyword);
      return games as prize[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchPrize = createAsyncThunk("fetchPrize", async (_, api) => {
  try {
    return await prizeService.getPrize();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removePrize = createAsyncThunk("removePrize", async (id:string, api) => {
  try {
    return await prizeService.deletePrize(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editPrize = createAsyncThunk("editPrize", async (row:obj, api) => {
  try {
    return await prizeService.updatePrize(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const prizeSlice = createSlice({
  name: "prize",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPrize.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPrize.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addPrize.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as prize;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchPrize.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrize.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchPrize.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as prize);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchPrizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrizes.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchPrizes.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removePrize.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePrize.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removePrize.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editPrize.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPrize.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editPrize.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default prizeSlice.reducer;
