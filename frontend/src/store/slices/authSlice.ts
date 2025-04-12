import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
}
const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setUser: (state, action: PayloadAction<{ user: any; }>) => {
      state.user = action.payload;
    },
    
    logoutReducer: (state) => {
      state.user = null;
    }
  }
})

export const { logoutReducer, setUser } = authSlice.actions;
export default authSlice.reducer;
