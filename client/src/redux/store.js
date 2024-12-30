import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js';
import themeReducer from './theme/themeSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { theme } from 'flowbite-react';
import { createTransform } from 'redux-persist';
const expireTransform = createTransform(
  (inboundState, key) => {
    // Add metadata with a timestamp
    return { ...inboundState, _persistTimestamp: Date.now() };
  },
  (outboundState, key) => {
    if (outboundState) {
      const expirationTime =  86400 * 1000;
      const isExpired = Date.now() - outboundState._persistTimestamp > expirationTime;
      if (isExpired) {
        return {
          currentUser: null,
          error: null,
          loading: false,
          theme: 'light'
        }; 
      }
    }
    return outboundState;
  }
);

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
});

const persistConfig = {
    key: 'root',
    storage, 
    version: 1,
    transforms: [expireTransform],
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  
})

export const persistor = persistStore(store);