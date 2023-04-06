import api from "../../utils/api";
import { IUserCredential } from "../../types/User";
import type { IAuthApiCall } from "./types";

const AuthApiCall: IAuthApiCall = {
  login: async (userCredential: IUserCredential) => {
    return api({
      method: "POST",
      url: `/auth/login`,
      data: userCredential,
    });
  },
};

export { AuthApiCall };
