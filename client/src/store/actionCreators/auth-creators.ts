import axios from "axios";
import { API_URL } from "../../http";
import { AuthService } from "../../services/auth-service";
import { AuthSlice, IAuthState } from "../reducers/auth-reducer";
import { AppDispatch } from "../store";

export const registration =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthSlice.actions.setIsLoading(true));
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(
        AuthSlice.actions.successLogin({
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
          user: response.data.user,
        } as IAuthState)
      );
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(AuthSlice.actions.setIsLoading(false));
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthSlice.actions.setIsLoading(true));
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(
        AuthSlice.actions.successLogin({
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
          user: response.data.user,
        } as IAuthState)
      );
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(AuthSlice.actions.setIsLoading(false));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(AuthSlice.actions.setIsLoading(true));
    await AuthService.logout();
    localStorage.removeItem("token");
    dispatch(AuthSlice.actions.successLogout());
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(AuthSlice.actions.setIsLoading(false));
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(AuthSlice.actions.setIsLoading(true));

    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });

    localStorage.setItem("token", response.data.accessToken);
    dispatch(
      AuthSlice.actions.successLogin({
        refreshToken: response.data.refreshToken,
        accessToken: response.data.accessToken,
        user: response.data.user,
      } as IAuthState)
    );
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(AuthSlice.actions.setIsLoading(false));
  }
};
