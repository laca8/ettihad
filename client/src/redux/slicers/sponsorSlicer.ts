import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sponsorService from "../services/sponsor/sponsor";
import { objectId, sponsor } from "../../types/type";
type obj = sponsor & objectId
const initialState: {
  game: sponsor | null,
  games: sponsor[],
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
export const addSponsor = createAsyncThunk("addSponsor", async (row:sponsor, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await sponsorService.createSponsor(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchSponsors = createAsyncThunk("fetchSponsors", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await sponsorService.getSponsors(keyword);
      return games as sponsor[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchSponsor = createAsyncThunk("fetchSponsor", async (_, api) => {
  try {
    return await sponsorService.getSponsor();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeSponsor = createAsyncThunk("removeSponsor", async (id:string, api) => {
  try {
    return await sponsorService.deleteSponsor(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editSponsor = createAsyncThunk("editSponsor", async (row:obj, api) => {
  try {
    return await sponsorService.updateSponsor(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const sponsorSlice = createSlice({
  name: "sponsor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSponsor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSponsor.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addSponsor.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as sponsor;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchSponsor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSponsor.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchSponsor.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as sponsor);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchSponsors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSponsors.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchSponsors.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeSponsor.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeSponsor.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeSponsor.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editSponsor.pending, (state) => {
        state.loading = true;
      })
      .addCase(editSponsor.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editSponsor.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default sponsorSlice.reducer;
