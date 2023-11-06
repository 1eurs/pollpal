// rootReducer.js

import { combineReducers } from "redux";
import pollSlice from "./pollSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  polls: pollSlice,
  auth: authSlice,
});

export default rootReducer;
