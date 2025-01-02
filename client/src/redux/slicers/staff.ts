import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffService from "../services/staff/staff";
import { objectId, staff } from "../../types/type";
type obj = staff & objectId
const initialState: {
  game: staff | null,
  games: staff[],
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
export const addStaff = createAsyncThunk("addStaff", async (row:staff, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await staffService.createStaff(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchStaffs = createAsyncThunk("fetchStaffs", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await staffService.getStaffs(keyword);
      return games as staff[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchStaff = createAsyncThunk("fetchStaff", async (_, api) => {
  try {
    return await staffService.getStaff();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeStaff = createAsyncThunk("removeStaff", async (id:string, api) => {
  try {
    return await staffService.deleteStaff(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editStaff = createAsyncThunk("editStaff", async (row:obj, api) => {
  try {
    return await staffService.updateStaff(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStaff.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as staff;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as staff);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchStaffs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeStaff.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeStaff.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(editStaff.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editStaff.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default staffSlice.reducer;
