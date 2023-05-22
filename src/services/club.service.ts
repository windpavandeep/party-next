import axiosApi from '@src/config';

const PATHS = {
  club: 'club',
  clubDetail: 'club/clubDetail',
  clubUsers: 'users/get-club-users/',
  banner: 'club/add-banner',
  tableBanner: 'club/add-table-banner',
};

export const createClub = (payload: any) => axiosApi.post(PATHS.club, payload);
export const updateClub = (payload: any) => axiosApi.put(PATHS.club, payload);

export const getClubUsers = (clubId: any) =>
  axiosApi.get(`${PATHS.clubUsers}${clubId}`);

export const getClubDetail = (userId: any) =>
  axiosApi.get(`${PATHS.clubDetail}?userId=${userId}`);

export const uploadBanner = (payload: any, id: any) =>
  axiosApi.post(`${PATHS.banner}?clubId=${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });

export const uploadTableBanner = (payload: any, id: any) =>
  axiosApi.post(`${PATHS.tableBanner}?clubId=${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
