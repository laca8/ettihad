import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import infraService from "../services/infra/infra";
import { objectId, infra } from "../../types/type";
type obj = infra & objectId
const initialState: {
  game: infra | null,
  games: infra[],
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
export const addInfra = createAsyncThunk("addInfra", async (row:infra, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await infraService.createInfra(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchInfras = createAsyncThunk("fetchInfras", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await infraService.getInfras(keyword);
      return games as infra[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchInfra = createAsyncThunk("fetchInfra", async (_, api) => {
  try {
    return await infraService.getInfra();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeInfra = createAsyncThunk("removeInfra", async (id:string, api) => {
  try {
    return await infraService.deleteInfra(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editInfra = createAsyncThunk("editInfra", async (row:obj, api) => {
  try {
    return await infraService.updateInfra(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const infraSlice = createSlice({
  name: "infra",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInfra.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInfra.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addInfra.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as infra;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchInfra.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInfra.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchInfra.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as infra);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchInfras.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInfras.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchInfras.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeInfra.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeInfra.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeInfra.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editInfra.pending, (state) => {
        state.loading = true;
      })
      .addCase(editInfra.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editInfra.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default infraSlice.reducer;
