import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { alerts } from './alerts/alertsReducer';
import { auth } from './auth/authReducer';
import { posts } from './posts/postsReducer';
import { profile } from './profile/profileReducer';

const persistConfig = { key: 'root', storage, whitelist: ['auth', 'profile'] };

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
  posts,
});

export default persistReducer(persistConfig, rootReducer);
