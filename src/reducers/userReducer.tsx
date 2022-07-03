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
      const { followers, followings, ...user } = action.payload;

      console.log(action.payload);
      state.user = user;
      state.followers = followers || [];
      state.following = followings || [];
      state.loading = false;
    },
  },
});

export const { userLoaded } = userSlice.actions;

export default userSlice.reducer;
