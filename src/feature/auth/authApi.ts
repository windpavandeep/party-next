import {createAsyncThunk} from '@reduxjs/toolkit';
import {ACTION_TYPES} from './authType';
import {LoginPayloadTypes, SignupPayloadTypes} from '@src/types/auth.types';
import {
  getUserDetail,
  userLogin,
  userSignup,
  userUpdate,
} from '@src/services/auth.service';

/** `
 * Payload @LoginPayloadTypes
 */
export const userLoginAsync = createAsyncThunk(
  ACTION_TYPES.SIGNIN_USER,
  async (payload: LoginPayloadTypes, {rejectWithValue}) => {
    try {
      const response = await userLogin(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/** `
 * Payload @SignupPayloadTypes
 */
export const userSignupAsync = createAsyncThunk(
  ACTION_TYPES.SIGNUP_USER,
  async (payload: SignupPayloadTypes, {rejectWithValue}) => {
    try {
      const response = await userSignup(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/** `
 * Payload @SignupPayloadTypes
 */
export const addUserAsync = createAsyncThunk(
  ACTION_TYPES.ADD_HANDLER_USER,
  async (payload: SignupPayloadTypes, {rejectWithValue}) => {
    try {
      const response = await userSignup(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
/** `
 * Payload @SignupPayloadTypes
 */
export const updateUserAsync = createAsyncThunk(
  ACTION_TYPES.UPDATE_USER,
  async (payload: SignupPayloadTypes, {rejectWithValue}) => {
    try {
      const response = await userUpdate(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
/** `
 * Param userId
 */
export const getUserDetailAsync = createAsyncThunk(
  ACTION_TYPES.GET_UPDATE_USER,
  async (userId: number, {rejectWithValue}) => {
    try {
      const response = await getUserDetail(userId);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
