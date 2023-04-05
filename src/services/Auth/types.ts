import { AxiosResponse } from 'axios';
import {IUserCredential} from '../../types/User'

export interface IAuthApiCall {
  login: (userCredential: IUserCredential) => Promise<AxiosResponse>;
}
