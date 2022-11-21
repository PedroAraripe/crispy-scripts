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

// Action creators are generated for each case reducer function
export const { setShowBannerValue,  } = showBanner.actions

export default showBanner.reducer;