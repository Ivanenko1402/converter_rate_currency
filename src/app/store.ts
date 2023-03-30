import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ratesReducer from '../features/ratesSlice';

export const store = configureStore({
  reducer: {
    rates: ratesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
