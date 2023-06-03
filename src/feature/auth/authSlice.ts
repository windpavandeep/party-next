import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {
  addUserAsync,
  getUserDetailAsync,
  updateUserAsync,
  userLoginAsync,
  userSignupAsync,
} from './authApi';
export interface UserState {
  loading: Boolean;
  isAuth: Boolean;
  message: string;
  user: Object;
}

const initialState: UserState = {
  loading: false,
  isAuth: false,
  message: '',
  user: {},
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
    setLoading: state => {
      return {
        ...state,
        loading: true,
      };
    },
    onLogout: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      /**
       * Case is using for login action Pending / Fullfilled / Rejected
       */
      .addCase(userLoginAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          isAuth: true,
          user: action?.payload,
        };
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        const errorRes: any = action.payload;
        Toast.show({
          type: 'error',
          text1: errorRes?.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      /**
       * Case is using for Signup action Pending / Fullfilled / Rejected
       */
      /**
       * Case is using for login action Pending / Fullfilled / Rejected
       */
      .addCase(getUserDetailAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(getUserDetailAsync.fulfilled, (state, action) => {
        return {
          ...state,
          user: action?.payload,
        };
      })
      .addCase(getUserDetailAsync.rejected, (state, action) => {
        const errorRes: any = action.payload;
        Toast.show({
          type: 'error',
          text1: errorRes?.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      /**
       * Case is using for Signup action Pending / Fullfilled / Rejected
       */
      .addCase(userSignupAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Successfully signed up.',
        });
        return {
          ...state,
          loading: false,
          isAuth: true,
          user: action?.payload,
        };
      })
      .addCase(userSignupAsync.rejected, (state, action) => {
        const errorRes: any = action.payload;
        Toast.show({
          type: 'error',
          text1: errorRes?.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      /**
       * Case is using for Add user action Pending / Fullfilled / Rejected
       */
      .addCase(addUserAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(addUserAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Hanlder user created successfully.',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        const errorRes: any = action.payload;
        Toast.show({
          type: 'error',
          text1: errorRes?.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      /**
       * Case is using for update user action Pending / Fullfilled / Rejected
       */
      .addCase(updateUserAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'User update successfully.',
        });
        return {
          ...state,
          loading: false,
          user: {
            ...state.user,
            ...action.payload,
          },
        };
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        const errorRes: any = action.payload;
        Toast.show({
          type: 'error',
          text1: errorRes?.message,
        });
        return {
          ...state,
          loading: false,
        };
      });
  },
});

export const {setIsAuth, onLogout, setLoading} = authSlice.actions;
export default authSlice.reducer;
