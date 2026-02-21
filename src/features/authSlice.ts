import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("userEmail"),
  isAuthenticated: !!localStorage.getItem("token"),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; email: string }>,
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userEmail", action.payload.email);
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
