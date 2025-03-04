import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { addCustomer } from "./customerSlice"

const initialState = {
  currentBill: {
    id: uuidv4(),
    customerName: "",
    customerMobile: "",
    customerAddress: "",
    billingDate: new Date().toISOString().split("T")[0],
    items: [
      {
        id: uuidv4(),
        productName: "",
        productQuantity: 1,
        productPrice: 0,
        totalPrice: 0,
      },
    ],
    note: "",
    status: "Draft",
    subTotal: 0,
    taxRate: 9,
    taxAmount: 0,
    totalAmount: 0,
  },
  bills: JSON.parse(localStorage.getItem("bills")) || [],
  loading: false,
  error: null,
}

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    updateBillField: (state, action) => {
      const { field, value } = action.payload
      state.currentBill[field] = value
    },
    addItem: (state) => {
      state.currentBill.items.push({
        id: uuidv4(),
        productName: "",
        productQuantity: 1,
        productPrice: 0,
        totalPrice: 0,
      })
    },
    removeItem: (state, action) => {
      state.currentBill.items = state.currentBill.items.filter((item) => item.id !== action.payload)
    },
    updateItem: (state, action) => {
      const { id, field, value } = action.payload
      const itemIndex = state.currentBill.items.findIndex((item) => item.id === id)

      if (itemIndex !== -1) {
        state.currentBill.items[itemIndex][field] = value

        // Recalculate total price for this item
        const item = state.currentBill.items[itemIndex]
        item.totalPrice = item.productQuantity * item.productPrice

        // Recalculate bill totals
        const subTotal = state.currentBill.items.reduce((sum, item) => sum + item.totalPrice, 0)
        state.currentBill.subTotal = subTotal
        state.currentBill.taxAmount = (subTotal * state.currentBill.taxRate) / 100
        state.currentBill.totalAmount = subTotal + state.currentBill.taxAmount
      }
    },
    resetBill: (state) => {
      state.currentBill = {
        id: uuidv4(),
        customerName: "",
        customerMobile: "",
        customerAddress: "",
        billingDate: new Date().toISOString().split("T")[0],
        items: [
          {
            id: uuidv4(),
            productName: "",
            productQuantity: 1,
            productPrice: 0,
            totalPrice: 0,
          },
        ],
        note: "",
        status: "Draft",
        subTotal: 0,
        taxRate: 9,
        taxAmount: 0,
        totalAmount: 0,
      }
    },
    saveBill: (state) => {
      // Update status to Sent
      state.currentBill.status = "Sent"

      // Add to bills array
      state.bills.push({ ...state.currentBill })

      // Save to localStorage
      localStorage.setItem("bills", JSON.stringify(state.bills))
    },
  },
})

export const { updateBillField, addItem, removeItem, updateItem, resetBill, saveBill } = billSlice.actions

// Async action to save bill and add customer
export const saveBillAndAddCustomer = () => (dispatch, getState) => {
  const { currentBill } = getState().bills

  // Save the bill
  dispatch(saveBill())

  // Add to customers list
  const customer = {
    id: uuidv4(),
    name: currentBill.customerName,
    quantity: currentBill.items.reduce((sum, item) => sum + item.productQuantity, 0),
    billingDate: currentBill.billingDate,
    contact: currentBill.customerMobile,
    address: currentBill.customerAddress,
    price: currentBill.totalAmount,
  }

  dispatch(addCustomer(customer))

  // Reset the bill form
  dispatch(resetBill())

  return true
}

export default billSlice.reducer

