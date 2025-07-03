import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    value: {
      firstName: "",
      lastName: "",
      age: "",
      didClick: false,
    },
  },
  reducers: {
    setProfile: (state, action) => {
      state.value = action.payload;
    },
    resetProfile: (state) => {
      state.value = {
        firstName: "",
        lastName: "",
        age: "",
        didClick: false,
      };
    },
  },
});

export const { setProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
