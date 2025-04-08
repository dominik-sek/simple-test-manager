import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})

export type AuthStore = typeof store;
export type AuthState = ReturnType<AuthStore['getState']>;
export type AuthDispatch = AuthStore['dispatch']
