import {TOGGLE_DARK_THEME, SET_THEME} from '../reducers/types';

export const TOGGLE_THEME = () => ({
  type: TOGGLE_DARK_THEME,
});

export const SET_DARK_THEME = (theme) => ({
  type: SET_THEME,
  theme,
});
