import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { alerts } from './alerts/alertsReducer';

const persistConfig = { key: 'root', storage, whitelist: [''] };

const rootReducer = combineReducers({
  alerts,
});

export default persistReducer(persistConfig, rootReducer);
