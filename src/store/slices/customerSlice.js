import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  customers: JSON.parse(localStorage.getItem("customers")) || [],
  loading: false,
  error: null,
}

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload)
      localStorage.setItem("customers", JSON.stringify(state.customers))
    },
    setCustomers: (state, action) => {
      state.customers = action.payload
      localStorage.setItem("customers", JSON.stringify(state.customers))
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload)
      localStorage.setItem("customers", JSON.stringify(state.customers))
    },
  },
})

export const { addCustomer, setCustomers, deleteCustomer } = customerSlice.actions

export default customerSlice.reducer

