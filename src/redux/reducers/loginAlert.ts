import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertContent } from '../../types/interfaces';
import { RootState } from '../store';

interface LoginAlertState {
  value: AlertContent | null;
}

const initialState: LoginAlertState = {
  value: null,
};

const loginAlertSlice = createSlice({
  name: 'loginAlert',
  initialState,
  reducers: {
    setLoginAlert: (state, action: PayloadAction<AlertContent | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoginAlert } = loginAlertSlice.actions;
export const selectLoginAlert = (state: RootState) => state.loginAlert.value;

export default loginAlertSlice.reducer;
