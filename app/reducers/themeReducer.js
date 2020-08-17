import {TOGGLE_DARK_THEME, SET_THEME} from './types';

const initialState = false;

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_THEME:
      return !state;
    case SET_THEME:
      return action.theme === 'DARK';
    default:
      return state;
  }
};

export default ThemeReducer;
