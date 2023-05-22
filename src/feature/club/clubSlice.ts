import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {createClubAsync, getClubUsersAsync, updateClubAsync} from './clubApi';
import {getClubDetailAsync} from './clubApi';
export interface clubState {
  loading: Boolean;
  club: Object;
  users: any;
}

const initialState: clubState = {
  loading: false,
  club: {},
  users: {},
};

const clubSlice = createSlice({
  name: 'clubSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /**
       * Case is using for create club action Pending / Fullfilled / Rejected
       */
      .addCase(createClubAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(createClubAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Club successfully created.',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(createClubAsync.rejected, (state, action) => {
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
       * Case is using for update club action Pending / Fullfilled / Rejected
       */
      .addCase(updateClubAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(updateClubAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Club successfully updated.',
        });
        return {
          ...state,
          loading: false,
          club: {
            club: action.payload,
          },
        };
      })
      .addCase(updateClubAsync.rejected, (state, action) => {
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
       * Case is using for get Club action Pending / Fullfilled / Rejected
       */
      .addCase(getClubDetailAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(getClubDetailAsync.fulfilled, (state, action) => {
        console.log(' ==== res ====> ', action.payload);
        return {
          ...state,
          club: action?.payload,
          loading: false,
        };
      })
      .addCase(getClubDetailAsync.rejected, (state, action) => {
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
       * Case is using for get Club users action Pending / Fullfilled / Rejected
       */
      .addCase(getClubUsersAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(getClubUsersAsync.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
      })
      .addCase(getClubUsersAsync.rejected, (state, action) => {
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

export const {} = clubSlice.actions;
export default clubSlice.reducer;
