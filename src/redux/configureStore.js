import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import assetsReducer from './Assets';

const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
