import { IUser } from "./../user-model";

export interface IAuthResponce {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
