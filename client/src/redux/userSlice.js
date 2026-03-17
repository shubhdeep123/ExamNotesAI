import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    },

    setLoadingFalse: (state) => {
      state.isLoading = false;
    },

    updateCredits: (state, action) => {
      if (state.userData) {
        state.userData.credits = action.payload;
      }
    },
  },
});

export const { setUserData, updateCredits, setLoadingFalse } =
  userSlice.actions;

export default userSlice.reducer;