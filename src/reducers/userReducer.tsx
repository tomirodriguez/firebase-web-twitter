import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    user: null,
    following: [],
    followers: [],
  },
  reducers: {
    userLoaded: (state, action) => {
      state.user = action.payload.user || null;
      state.followers = action.payload?.followers || [];
      state.following = action.payload?.following || [];
      state.loading = false;
    },
  },
});

export const { userLoaded } = userSlice.actions;

export default userSlice.reducer;
