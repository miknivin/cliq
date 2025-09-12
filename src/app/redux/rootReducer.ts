import { combineReducers } from "redux";

import { vendorApi } from "./api/masters/vendorApi";
import vendorFormSlice from './slices/masters/vendorFormSlice';
import { currencyApi } from "./api/masters/currencyApi";
import { categoryApi } from "./api/masters/categoryApi";
import { uomApi } from "./api/masters/uomApi";
import { productApi } from "./api/masters/productApi";
import productFormSlice from "./slices/masters/productFormSlice";
import { taxApi } from "./api/masters/taxApi";
import purchaseOrderSlice from "./slices/purchase-order/purchaseOrderSlice";


const rootReducer = combineReducers({
  vendor: vendorFormSlice,
  productForm: productFormSlice,
  purchaseOrderForm:purchaseOrderSlice,
  [productApi.reducerPath]: productApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [currencyApi.reducerPath]:currencyApi.reducer,
  [categoryApi.reducerPath]:categoryApi.reducer,
  [taxApi.reducerPath]:taxApi.reducer,
  [uomApi.reducerPath]:uomApi.reducer
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
