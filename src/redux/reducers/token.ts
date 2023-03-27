import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TokenState {
  value: string;
}

const getTokenInitialState = (): string => {
  const storedToken = localStorage.getItem('token');
  return storedToken ? JSON.parse(storedToken) : '';
};

const initialState: TokenState = {
  value: getTokenInitialState(),
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const selectToken = (state: RootState) => state.token.value;

export default tokenSlice.reducer;
