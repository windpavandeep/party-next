import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {
  createEventAsync,
  createTicketAsync,
  getALlEventAsync,
} from './eventApi';
export interface eventState {
  loading: Boolean;
  event: Object;
  list: Object[];
  users: any;
  ticket: Object[];
}

const initialState: eventState = {
  loading: false,
  event: {},
  list: [],
  users: {},
  ticket: [],
};

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /**
       * Case is using for create club action Pending / Fullfilled / Rejected
       */
      .addCase(createEventAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(createEventAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Successfully Saved.',
        });
        return {
          ...state,
          loading: false,
          event: action.payload,
        };
      })
      .addCase(createEventAsync.rejected, (state, action) => {
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
      // Event create
      .addCase(createTicketAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(createTicketAsync.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Ticket added successfully.',
        });
        return {
          ...state,
          loading: false,
          ticket: [...state.ticket, action.payload],
        };
      })
      .addCase(createTicketAsync.rejected, (state, action) => {
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
      // Event List
      .addCase(getALlEventAsync.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(getALlEventAsync.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          list: action.payload,
        };
      })
      .addCase(getALlEventAsync.rejected, (state, action) => {
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

export const {} = eventSlice.actions;
export default eventSlice.reducer;
