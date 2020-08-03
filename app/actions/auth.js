import {LOGIN, LOGOUT, REGISTER, RETRIEVE_TOKEN} from '../reducers/types';

export const SIGNIN = (username, token) => ({
  type: LOGIN,
  id: username,
  token,
});

export const SIGNOUT = () => ({type: LOGOUT});

export const SIGNUP = (username, token) => ({
  type: REGISTER,
  id: username,
  token,
});

export const CHECK_TOKEN = (token) => ({
  type: RETRIEVE_TOKEN,
  token,
});
