import axiosApi from '@src/config';

const PATHS = {
  club: 'club',
  clubDetail: 'club/clubDetail',
  clubUsers: 'users/get-club-users/',
  banner: 'club/add-banner?clubId=1',
};

export const createClub = (payload: any) => axiosApi.post(PATHS.club, payload);

export const getClubUsers = (clubId: any) =>
  axiosApi.get(`${PATHS.clubUsers}${clubId}`);

export const getClubDetail = (userId: any) =>
  axiosApi.get(`${PATHS.clubDetail}?userId=${userId}`);

export const uploadBanner = (payload: any) =>
  axiosApi.post(PATHS.banner, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
