import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showBanner: '',
};

export const showBanner = createSlice({
  name: 'showBanner',
  initialState,
  reducers: {
    setShowBannerValue: (state, action) => {
      state.showBanner = action.payload
    },
  },
});

export const { setShowBannerValue,  } = showBanner.actions

export default showBanner.reducer;