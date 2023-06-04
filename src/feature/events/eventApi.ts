import {createAsyncThunk} from '@reduxjs/toolkit';
import {ACTION_TYPES} from './eventType';
import {
  addEventTicket,
  createEvent,
  getEvents,
} from '@src/services/event.service';

export const createEventAsync = createAsyncThunk(
  ACTION_TYPES.CREATE_EVENT,
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await createEvent(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
export const createTicketAsync = createAsyncThunk(
  ACTION_TYPES.CREATE_TICKET,
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await addEventTicket(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
export const getALlEventAsync = createAsyncThunk(
  ACTION_TYPES.GET_EVENT,
  async (payload: number, {rejectWithValue}) => {
    try {
      const response = await getEvents(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
