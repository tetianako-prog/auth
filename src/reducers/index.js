import { combineReducers } from 'redux';

import user from './users';
import contacts from './contacts';

const rootReducer = combineReducers({
  user,
  contacts,
});

export default rootReducer;
