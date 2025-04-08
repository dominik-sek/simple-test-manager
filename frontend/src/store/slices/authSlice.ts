import { DecodedToken } from '@/types/DecodedToken';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


interface AuthState {
  token: string | null;
  user: DecodedToken | null;
}
const initialState: AuthState = {
  token: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    loginReducer: (state, action: PayloadAction<{token: string}>) => {
      const { token } = action.payload;
      const decoded = jwtDecode<DecodedToken>(token)
      
      state.user = decoded;
      state.token = token;
    },
    logoutReducer: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
