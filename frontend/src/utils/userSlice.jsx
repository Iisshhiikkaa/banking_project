import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
  },
  reducers: {
    adduser: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload, // merge new data with existing
      };
    },
    emptyUserInfo: (state) => {
      state.userInfo = {}; // <-- reset to empty object
    },
    
  },
});

export const { adduser, emptyUserInfo } = userSlice.actions;
export default userSlice.reducer;
