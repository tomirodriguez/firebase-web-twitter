import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    user: null,
  },
  reducers: {
    userLoaded: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const { userLoaded } = userSlice.actions;

export default userSlice.reducer;
