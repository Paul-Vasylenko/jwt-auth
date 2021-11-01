import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user-model";

export interface IAuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
  user: {} as IUser,
  accessToken: null,
  refreshToken: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    successLogin: (state, action: PayloadAction<IAuthState>) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
      state.user.email = action.payload.user.email;
      state.user.id = action.payload.user.id;
      state.user.isActivated = action.payload.user.isActivated;
    },
    successLogout: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {} as IUser;
    },
  },
});

export default AuthSlice.reducer;
