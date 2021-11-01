import { AxiosResponse } from "axios";
import $api from "../http";
import { IAuthResponce } from "./../models/response/auth-response";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponce>> {
    return $api.post<IAuthResponce>("/login", { email, password });
  }
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponce>> {
    return $api.post<IAuthResponce>("/registration", { email, password });
  }
  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
