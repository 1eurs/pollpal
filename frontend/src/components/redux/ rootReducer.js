// rootReducer.js

import { combineReducers } from "redux";
import PollSlice from "./ pollSlice";

const rootReducer = combineReducers({
  // Other reducers here
  polls: PollSlice,
});

export default rootReducer;
