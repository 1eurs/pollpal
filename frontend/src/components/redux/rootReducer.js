// rootReducer.js

import { combineReducers } from "redux";
import pollSlice from "./pollSlice";

const rootReducer = combineReducers({
  // Other reducers here
  polls: pollSlice,
});

export default rootReducer;
