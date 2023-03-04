import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound404 from "./pages/NotFound404";

//ref https://stackoverflow.com/questions/74168742/how-to-template-jsx-with-createbrowserrouter
//TODO: create header and add header to router
// const HeaderLayout = () => (
//   <>
//     <header>
//       <Navbar />
//     </header>
//     <Outlet />
//   </>
// );

// ref https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  {
    // element: <HeaderLayout />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} fallbackElement={<CircularProgress />} />
);
