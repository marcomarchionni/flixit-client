import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LoadingState {
  value: boolean;
}

const initialState: LoadingState = {
  value: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loading.value;

export default loadingSlice.reducer;
