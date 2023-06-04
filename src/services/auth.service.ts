import axiosApi from '@src/config';
import {LoginPayloadTypes, SignupPayloadTypes} from '@src/types/auth.types';

const PATHS = {
  users: 'users',
  signup: 'users/signup',
  login: 'login',
  imageUpdate: 'users/change-profile',
  deleteHandler: 'users/delete-handler/',
};

export const userLogin = (payload: LoginPayloadTypes) =>
  axiosApi.post(PATHS.login, payload);

export const userSignup = (payload: SignupPayloadTypes) =>
  axiosApi.post(PATHS.signup, payload);

export const deleteHandlerUser = (userId: number) =>
  axiosApi.delete(`${PATHS.deleteHandler}${userId}`);

export const getUserDetail = (id: number) =>
  axiosApi.get(`${PATHS.users}/${id}`);

export const userUpdate = (payload: SignupPayloadTypes) =>
  axiosApi.put(PATHS.users, payload);

export const imageChange = (payload: any, userId: any) =>
  axiosApi.post(`${PATHS.imageUpdate}?userId=${userId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
