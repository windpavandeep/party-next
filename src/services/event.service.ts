import axiosApi from '@src/config';

const PATHS = {
  event: 'events',
  addTickets: 'events/add-ticket',
  bannerChanges: 'events/event-banner',
  getTicketWithEventId: 'events/get-tickets-with-eventid/',
  addImages: 'events/add-images',
  addImagesGallery: 'events/event-gallary/', //events/event-gallary/:index/:eventId
  getImages: 'events/get-images/',
};

export const createEvent = (payload: any) =>
  axiosApi.post(PATHS.event, payload);
export const getEvents = (userId: number) =>
  axiosApi.get(`${PATHS.event}/${userId}`);
export const addEventTicket = (payload: any) =>
  axiosApi.post(PATHS.addTickets, payload);
export const getTicketWithEventId = (eventId: any) =>
  axiosApi.get(`${PATHS.getTicketWithEventId}${eventId}`);

export const bannerChange = (payload: any, eventId: any) =>
  axiosApi.post(`${PATHS.bannerChanges}?eventId=${eventId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });

export const addImagesEntry = (payload: any) =>
  axiosApi.post(PATHS.addImages, payload);

export const getImagesEntry = (id: any) =>
  axiosApi.get(`${PATHS.getImages}${id}`);

/**
 *
 * @param payload
 * @param eventId
 * @param index
 * @returns
 */
export const addImageGallary = (payload: any, eventId: any, index: any) =>
  axiosApi.post(`${PATHS.addImagesGallery}${index}/${eventId}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
