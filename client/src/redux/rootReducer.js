import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { alerts } from './alerts/alertsReducer';
import { auth } from './auth/authReducer';
import { profile } from './profile/profileReducer';

const persistConfig = { key: 'root', storage, whitelist: ['auth', 'profile'] };

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
});

export default persistReducer(persistConfig, rootReducer);
