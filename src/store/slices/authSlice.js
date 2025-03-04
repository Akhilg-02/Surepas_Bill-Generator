import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
      state.error = null
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("user")
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

// Async action
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart())

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation (in a real app, this would be a server call)
    if (credentials.email === "admin@example.com" && credentials.password === "password") {
      dispatch(loginSuccess({ email: credentials.email, name: "Admin User" }))
      return true
    } else {
      dispatch(loginFailure("Invalid email or password"))
      return false
    }
  } catch (error) {
    dispatch(loginFailure(error.message))
    return false
  }
}

export default authSlice.reducer

