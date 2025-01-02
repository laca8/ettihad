import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playerService from "../services/sport/player";
import { objectId, player } from "../../types/type";
type obj = player & objectId
const initialState: {
  game: player | null,
  games: player[],
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
export const addPlayer = createAsyncThunk("addPlayer", async (row:player, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await playerService.createPlayer(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchPlayers = createAsyncThunk("fetchPlayers", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await playerService.getPlayers(keyword);
      return games as player[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchPlayer = createAsyncThunk("fetchPlayer", async (_, api) => {
  try {
    return await playerService.getPlayer();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removePlayer = createAsyncThunk("removePlayer", async (id:string, api) => {
  try {
    return await playerService.deletePlayer(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editPlayer = createAsyncThunk("editPlayer", async (row:obj, api) => {
  try {
    return await playerService.updatePlayer(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlayer.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as player;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayer.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchPlayer.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as player);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removePlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePlayer.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removePlayer.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPlayer.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editPlayer.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default playerSlice.reducer;
