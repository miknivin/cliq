import { combineReducers } from "redux";

import { vendorApi } from "./api/masters/vendorApi";
import vendorFormSlice from './slices/masters/vendorFormSlice';


const rootReducer = combineReducers({
  vendor: vendorFormSlice,
  [vendorApi.reducerPath]: vendorApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
