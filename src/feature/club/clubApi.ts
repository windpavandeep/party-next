import {createAsyncThunk} from '@reduxjs/toolkit';
import {ACTION_TYPES} from './clubType';
import {
  createClub,
  getClubDetail,
  getClubUsers,
} from '@src/services/club.service';

export const createClubAsync = createAsyncThunk(
  ACTION_TYPES.CREATE_CLUB,
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await createClub(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
export const getClubDetailAsync = createAsyncThunk(
  ACTION_TYPES.GET_CLUB_DETAIL,
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await getClubDetail(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
export const getClubUsersAsync = createAsyncThunk(
  ACTION_TYPES.GET_CLUB_USERS,
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await getClubUsers(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
