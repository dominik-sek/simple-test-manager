import { useDispatch, useSelector, useStore } from 'react-redux';
import { AuthStore, AuthDispatch, AuthState } from './store';

export const useAuthDispatch = useDispatch.withTypes<AuthDispatch>();
export const useAuthSelector = useSelector.withTypes<AuthState>()
export const useAuthStore = useStore.withTypes<AuthStore>()
