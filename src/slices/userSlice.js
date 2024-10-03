import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Artista',
  avatar: 'https://via.placeholder.com/40', // Placeholder image
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.name = '';
      state.avatar = '';
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;