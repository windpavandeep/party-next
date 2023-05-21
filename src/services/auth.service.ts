import axiosApi from '@src/config';
import {LoginPayloadTypes, SignupPayloadTypes} from '@src/types/auth.types';

const PATHS = {
  signup: 'users/signup',
  login: 'login',
  imageUpdate: 'change-profile',
};

export const userLogin = (payload: LoginPayloadTypes) =>
  axiosApi.post(PATHS.login, payload);

export const userSignup = (payload: SignupPayloadTypes) =>
  axiosApi.post(PATHS.signup, payload);

export const imageChange = (payload: any) =>
  axiosApi.post(PATHS.imageUpdate, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
