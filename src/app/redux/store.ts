import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { vendorApi } from "./api/masters/vendorApi";
import { currencyApi } from "./api/masters/currencyApi";
import { uomApi } from "./api/masters/uomApi";
import { categoryApi } from "./api/masters/categoryApi";
import { productApi } from "./api/masters/productApi";
import { taxApi } from "./api/masters/taxApi";
import { purchaseOrderApi } from "./api/purchaseOrderApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vendorApi.middleware,
      currencyApi.middleware,
      uomApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      taxApi.middleware,
      purchaseOrderApi.middleware
    ),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
