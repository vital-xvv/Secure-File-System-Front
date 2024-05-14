import { combineReducers } from 'redux';

import user from './user';
import userList from './userList';
import files from './filesReducer';
import snackBar from './snackBarReducer';

export default combineReducers({
  user,
  userList,
  files,
  snackBar
});
