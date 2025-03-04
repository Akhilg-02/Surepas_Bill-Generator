import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import customerReducer from "./slices/customerSlice"
import billReducer from "./slices/billSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    bills: billReducer,
  },
})

