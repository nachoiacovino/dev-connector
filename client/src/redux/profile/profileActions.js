import { GET_PROFILE_START, UPDATE_PROFILE_START } from './profileTypes';

export const getProfileStart = () => ({
  type: GET_PROFILE_START,
});

export const updateProfileStart = (payload) => ({
  type: UPDATE_PROFILE_START,
  payload,
});
