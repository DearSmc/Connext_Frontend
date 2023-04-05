import axios from "axios";
import api from "../../utils/api";
import { IUserCredential } from "../../types/User";
import type { IAuthApiCall } from "./types";

const baseURL = import.meta.env.VITE_API_URL;

// // import type { IAnnouncementAPICall } from './types';

// // const options = {
// //   method: "GET",
// //   url: "https://movie-database-alternative.p.rapidapi.com/",
// //   params: { s: "Avengers Endgame", r: "json", page: "1" },
// //   headers: {
// //     "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
// //     "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
// //   },
// // };

// // axios
// //   .request(options)
// //   .then(function (response) {
// //     console.log(response.data);
// //   })
// //   .catch(function (error) {
// //     console.error(error);
// //   });

// // interface Response {
// //   text: string;
// //   author: string;
// //   category: string;
// //   id: number;
// // }

// // const getMovie = () => {
// //   axios
// //     .request(options)
// //     .then(function ({ data }: { data: Response }) {
// //       console.log(data);
// //     })
// //     .catch(function (error: any) {
// //       console.error(error);
// //     });
// // };

// interface IUserCredential {
//   email: FormDataEntryValue | null;
//   password: FormDataEntryValue | null;
// }

// // const options = {
// //   method: "GET",
// //   url: "http://localhost:7001/",
// //   // params: { s: "Avengers Endgame", r: "json", page: "1" },
// //   // headers: {
// //   //   "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
// //   //   "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
// //   // },
// // };

// const options = {
//   method: "POST",
//   url: "/auth/login",
//   // params: { s: "Avengers Endgame", r: "json", page: "1" },
//   // headers: {
//   //   "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
//   //   "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
//   // },
// };

// const Login = (userCredential: IUserCredential) => {
//   if (userCredential.email && userCredential.password) {
//     let payload = {
//       body: {
//         ...userCredential,
//       },
//       ...options,
//     };
//     axios
//       .request(payload)
//       .then(function (res) {
//         console.log("res", res.data);
//         return res.data;
//       })
//       .catch(function (error: any) {
//         console.error("error", error);
//         return error;
//       });
//   //   api({
//   //     method: "POST",
//   //     url: `/auth/login`,
//   //     data: payload,
//   //   })
//   //     .then((res) => {
//   //       if (res.status === 200) {
//   //         const idToken = res.data as string;
//   //         localStorage.setItem("idToken", idToken);
//   //         // fetchSessionHandler();
//   //       }
//   //     })
//   //     .catch(() => {
//   //       // setPasswordError('Invalid email or password');
//   //       console.error("Invalid email or password");
//   //     });
//   // }
// };

// // const announcementApiCall: IAnnouncementAPICall = {
// //   getAnnouncements: () => {
// //     return api({
// //       method: "get",
// //       url: `/announcement/all`,
// //       headers: {
// //         authorization: `Bearer ${localStorage.getItem("idToken")}`,
// //       },
// //     });
// //   },
// // };

// export { Login }

const options = {
  method: "POST",
  url: baseURL + "/auth/login",
};

const AuthApiCall: IAuthApiCall = {
  login: async (userCredential: IUserCredential) => {
    console.log("baseURL:", baseURL);
    let payload = {
      body: {
        ...userCredential,
      },
      ...options,
    };
    return axios
      .request(payload)
      .then(function (res) {
        console.log("res", res.data);
        return res.data;
      })
      .catch(function (error: any) {
        console.error(error.response);
        return error.response.data.message;
      });

    return api({
      method: "POST",
      url: `/auth/login`,
      data: userCredential,
    });
  },
};

export { AuthApiCall };
