import axios from "axios";

// const options = {
//   method: "GET",
//   url: "https://movie-database-alternative.p.rapidapi.com/",
//   params: { s: "Avengers Endgame", r: "json", page: "1" },
//   headers: {
//     "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
//     "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// interface Response {
//   text: string;
//   author: string;
//   category: string;
//   id: number;
// }

// const getMovie = () => {
//   axios
//     .request(options)
//     .then(function ({ data }: { data: Response }) {
//       console.log(data);
//     })
//     .catch(function (error: any) {
//       console.error(error);
//     });
// };

interface IUserCredential {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

// const options = {
//   method: "GET",
//   url: "http://localhost:7001/",
//   // params: { s: "Avengers Endgame", r: "json", page: "1" },
//   // headers: {
//   //   "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
//   //   "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
//   // },
// };

const options = {
  method: "POST",
  url: "http://localhost:7001/api/auth/login",
  // params: { s: "Avengers Endgame", r: "json", page: "1" },
  // headers: {
  //   "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
  //   "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  // },
};

const Login = (userCredential: IUserCredential) => {
  if (userCredential.email && userCredential.password) {
    let payload = {
      body: {
        ...userCredential,
      },
      ...options,
    };
    axios
      .request(payload)
      .then(function (res) {
        console.log("res", res.data);
        return res.data;
      })
      .catch(function (error: any) {
        console.error("error", error);
        return error;
      });
  }
};

export { Login };
