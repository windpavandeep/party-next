import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  loading: Boolean;
  isAuth: Boolean;
  message: string;
}

const initialState: UserState = {
  loading: false,
  isAuth: false,
  message: '',
};

const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      // state.isAuth = action.payload;
      return {
        ...state,
        isAuth: action.payload,
        message: 'This is me',
      };
    },
  },
});

export const {setIsAuth} = authSlice.actions;
export default authSlice.reducer;
