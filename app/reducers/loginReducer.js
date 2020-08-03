import {LOGIN, LOGOUT, RETRIEVE_TOKEN, REGISTER} from './types';

const initialState = {
  isLoading: true,
  userToken: null,
  userName: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case LOGIN:
      return {
        ...state,
        userToken: action.token,
        userName: action.id,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: null,
        userName: null,
        isLoading: false,
      };
    case REGISTER:
      return {
        ...state,
        userToken: action.token,
        userName: action.id,
        isLoading: false,
      };
    default:
      return {...state};
  }
};

export default loginReducer;
