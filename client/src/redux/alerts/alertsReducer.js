import { DELETE_ALERT, SET_ALERT } from './alertsTypes';

const initialState = [];

export const alerts = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case DELETE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};
