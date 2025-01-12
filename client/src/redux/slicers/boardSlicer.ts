import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from "../services/board/board";
import { objectId, board } from "../../types/type";
type obj = board & objectId
const initialState: {
  game: board | null,
  games: board[],
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
export const addBoard = createAsyncThunk("addBoard", async (row:board, api) => {
  try {
    return await boardService.createBoard(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchBoards = createAsyncThunk("fetchBoards", async (keyword:{code:string}, api) => {
    try {
      const games = await boardService.getBoards(keyword);
      return games as board[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchBoard = createAsyncThunk("fetchBoard", async (_, api) => {
  try {
    return await boardService.getBoard();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeBoard = createAsyncThunk("removeBoard", async (id:string, api) => {
  try {
    return await boardService.deleteBoard(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editBoard = createAsyncThunk("editBoard", async (row:obj, api) => {
  try {
    return await boardService.updateBoard(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBoard.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as board;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as board);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBoard.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBoard.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default boardSlice.reducer;
