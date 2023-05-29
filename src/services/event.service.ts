import axiosApi from '@src/config';

const PATHS = {
  event: 'events',
  addTickets: 'events/add-ticket',
};

export const createEvent = (payload: any) =>
  axiosApi.post(PATHS.event, payload);
export const addEventTicket = (payload: any) =>
  axiosApi.post(PATHS.addTickets, payload);
