import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slicers/gameSlicer";
import playerSlice from "./slicers/playerSlicer";
import coachSlice from "./slicers/coachSlicer";
import prizeSlice from "./slicers/prizeSlice";
import staffSlice from "./slicers/staff";
import sponsorSlice from "./slicers/sponsorSlicer";
import sportSponsorSlice from "./slicers/sportSponsor";
import playerSponsorSlice from "./slicers/playerSponsor";
import clubSponsorSlice from "./slicers/clubSponsor";
import infraSlice from "./slicers/infraSlicer";
import memberSlice from "./slicers/memberSlicer";
import boardSlice from "./slicers/boardSlicer";
import lectureSlice from "./slicers/lecture";

const store = configureStore({
  reducer: {
    gameSlice: gameSlice,
    playerSlice: playerSlice,
    coachSlice: coachSlice,
    prizeSlice: prizeSlice,
    staffSlice: staffSlice,
    sponsorSlice: sponsorSlice,
    sportSponsorSlice: sportSponsorSlice,
    playerSponsorSlice: playerSponsorSlice,
    clubSponsorSlice: clubSponsorSlice,
    infraSlice: infraSlice,
    memberSlice: memberSlice,
    boardSlice: boardSlice,
    lectureSlice: lectureSlice,
  },
});
// Define the `AppDispatch` type from the store's dispatch function
export type AppDispatch = typeof store.dispatch;
// Define the `RootState` type from the store's state
export type RootState = ReturnType<typeof store.getState>;
export default store;
