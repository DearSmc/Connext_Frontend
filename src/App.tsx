import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./index.css";
import { RouterProvider, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import router from "./router";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

function App() {
  // const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<CircularProgress />} />
    </ThemeProvider>
    // <div className="App">
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src="/vite.svg" className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://reactjs.org" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    //   <ButtonGroup
    //     variant="outlined"
    //     aria-label="outlined primary button group"
    //   >
    //     <Button onClick={() => alert("Hello World")}>One</Button>
    //     <Button>Two</Button>
    //     <Button>Three</Button>
    //   </ButtonGroup>
    // </div>
  );
}

export default App;
