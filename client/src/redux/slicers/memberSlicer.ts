import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "../services/member/member";
import { objectId, member } from "../../types/type";
type obj = member & objectId
const initialState: {
  game: member | null,
  games: member[],
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
export const addMember = createAsyncThunk("addMember", async (row:member, api) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
       
    //   },
    // };
    return await memberService.createMember(row);
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const fetchMembers = createAsyncThunk("fetchMembers", async (keyword:{name:string,code:string}, api) => {
    try {
      const games = await memberService.getMembers(keyword);
      return games as member[];
    } catch (error) {
      // console.log(error);
      return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
    }
  });
export const fetchMember = createAsyncThunk("fetchMember", async (_, api) => {
  try {
    return await memberService.getMember();
  } catch (error) {
    // console.log(error);
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);

  }
});

export const removeMember = createAsyncThunk("removeMember", async (id:string, api) => {
  try {
    return await memberService.deleteMember(id);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  
  }
});
export const editMember = createAsyncThunk("editMember", async (row:obj, api) => {
  try {
    return await memberService.updateMember(row);
  } catch (error) {
    return api.rejectWithValue((error as { response: { data: { message: string } } })?.response?.data?.message);
  }
});
export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMember.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
          state.game = action.payload as member;
          state.success = true;
          state.error = null;
      })
      .addCase(fetchMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
          state.error = action.payload as string;
         
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload as member);
          (state.success = true);
          (state.error = null);
      })
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        (state.loading = false);
          (state.games = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(removeMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeMember.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      })
      .addCase(editMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(editMember.rejected, (state, action) => {
        (state.success = false);
          (state.loading = false);
          state.error = action.payload as string;
          
      })
      .addCase(editMember.fulfilled, (state, action) => {
        (state.loading = false);
          (state.game = action.payload);
          (state.success = true);
          (state.error = null);
      });
  },
});
export default memberSlice.reducer;
