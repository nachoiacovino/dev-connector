import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { alerts } from './alerts/alertsReducer';
import { auth } from './auth/authReducer';

const persistConfig = { key: 'root', storage, whitelist: ['auth'] };

const rootReducer = combineReducers({
  alerts,
  auth,
});

export default persistReducer(persistConfig, rootReducer);
