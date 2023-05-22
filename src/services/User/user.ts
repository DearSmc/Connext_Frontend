import api from "../../utils/api";
import type { IUserApiCall } from "./types";

const UserApiCall: IUserApiCall = {
  getUserInfo: async (token: string) => {
    return api({
      method: "GET",
      url: `/user/getUserInfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export { UserApiCall };
