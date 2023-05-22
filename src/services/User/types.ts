import { AxiosResponse } from "axios";
import { IUserRegisterInfo, IUserCredential } from "../../types/User";

export interface IUserApiCall {
  getUserInfo: (token:string) => Promise<AxiosResponse>;

}