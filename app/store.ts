import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./features/otp/otp";
import profileReducer from "./features/profile/profile.js";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    otp: otpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
