import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/interfaces';
import { RootState } from '../store';

interface UserState {
  value: User | null;
}

const getUserInitialState = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: UserState = {
  value: getUserInitialState(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
