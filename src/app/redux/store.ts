import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { vendorApi } from "./api/masters/vendorApi";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vendorApi.middleware
    ),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
