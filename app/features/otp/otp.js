import { createSlice } from "@reduxjs/toolkit";

export const otpSlice = createSlice({
  name: "otp",
  initialState: {
    value: false,
  },
  reducers: {
    setOtp: (state, action) => {
      state.value = action.payload;
    },
    resetOtp: (state) => {
      state.value = false;
    },
  },
});

export const { setOtp, resetOtp } = otpSlice.actions;

export default otpSlice.reducer;
