import loginReducer from './loginReducer';
import themeReducer from './themeReducer';
import searchReducer from './searchBar';
import storeReducer from './store';
import {combineReducers} from 'redux';

export default allReducers = combineReducers({
  auth: loginReducer,
  theme: themeReducer,
  searchbar: searchReducer,
  store: storeReducer,
});
