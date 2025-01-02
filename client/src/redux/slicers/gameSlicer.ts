import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "../services/sport/game";
import { objectId, sport } from "../../types/type";
type obj = sport & objectId
const initialState: {
  game: sport | null,
  games: sport[],
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
export const addGame = createAsyncThunk("addGame", async (row:sport, api) => {
  try {
    return await gameService.createGame(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchGames = createAsyncThunk("fetchGames", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await gameService.getGames(keyword);
      return games as sport[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchGame = createAsyncThunk("fetchGame", async (_, api) => {
  try {
    return await gameService.getGame();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeGame = createAsyncThunk("removeGame", async (id:string, api) => {
  try {
    return await gameService.deleteGame(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editGame = createAsyncThunk("editGame", async (row:obj, api) => {
  try {
    return await gameService.updateGame(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGame.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addGame.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as sport;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGame.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as sport);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeGame.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeGame.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(editGame.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editGame.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default gameSlice.reducer;
