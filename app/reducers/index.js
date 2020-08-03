import loginReducer from './loginReducer';
import themeReducer from './themeReducer';
import {combineReducers} from 'redux';

export default allReducers = combineReducers({
  auth: loginReducer,
  theme: themeReducer,
});
