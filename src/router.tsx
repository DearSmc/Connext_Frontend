import { createBrowserRouter, Link, Outlet } from "react-router-dom";
// import Alert from "@mui/material/Alert";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound404 from "./pages/NotFound404";

import { Box } from "@mui/system";

//TODO: create real Navbar
const Navbar = () => (
  <Box sx={{ width: "50vw", display: "flex", justifyContent: "space-between" }}>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </Box>
);

//ref https://stackoverflow.com/questions/74168742/how-to-template-jsx-with-createbrowserrouter
//TODO: create header and add header to router
const Layout = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      // backgroundColor: "primary.main",
    }}
  >
    {/* TODO: add alert here */}
    {/* <header>
      <Navbar />
    </header> */}
    <Outlet />
  </Box>
);

// ref https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
