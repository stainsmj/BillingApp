import {SEARCHBAR_VISIBLE} from './types';
const initialState = false;

const SearchbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCHBAR_VISIBLE:
      return !state;
    default:
      return state;
  }
};

export default SearchbarReducer;
