import { DecodedToken } from '@/types/DecodedToken';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


interface AuthState {
  token: string | null;
  decodedToken: DecodedToken | null;
  user: any;
}
const initialState: AuthState = {
  token: null,
  decodedToken: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    loginReducer: (state, action: PayloadAction<{token: string}>) => {
      const { token } = action.payload;
      const decoded = jwtDecode<DecodedToken>(token)
      
      state.decodedToken = decoded;
      state.token = token;
    },
    setUser: (state, action: PayloadAction<{ user: any; }>) => {
      state.user = action.payload;
    },
    
    logoutReducer: (state) => {
      state.decodedToken = null;
      state.token = null;
      state.user = null;
    }
  }
})

export const { loginReducer, logoutReducer, setUser } = authSlice.actions;
export default authSlice.reducer;
