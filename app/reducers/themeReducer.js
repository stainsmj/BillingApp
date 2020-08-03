import {TOGGLE_DARK_THEME} from './types';

const initialState = false;

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_THEME:
      return !state;
    default:
      return state;
  }
};

export default ThemeReducer;
