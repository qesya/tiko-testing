import {ThunkAction} from 'redux-thunk';
import {
  configureStore,
  Action,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import MMKVReduxStorage from './storage';

// REDUCER
import testSliceReducer from './slices/TestSlice';

const persistConfig = {
  key: 'root',
  storage: MMKVReduxStorage,
  blacklist: [''],
};

export const rootReducer = combineReducers({
  testStore: testSliceReducer,
});

const persistedRecuder = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRecuder,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
