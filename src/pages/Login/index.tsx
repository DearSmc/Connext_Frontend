import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import { AuthApiCall } from "../../services/Auth/auth";
// import { Login } from "../../services/Auth/auth";

export default function index() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    // TODO: validate data before submit
    // if (userCredential.email && userCredential.password) {

    AuthApiCall.login({
      email: data.get("email"),
      password: data.get("password"),
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          setErrMsg("");
          setIsErr(false);
        }
      })
      .catch((res) => {
        setErrMsg(res.message);
        setIsErr(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Alert severity="error" style={!isErr ? { display: "none" } : {}}>
        {errMsg}
      </Alert>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Avatar variant="rounded" sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {/* TODO: Login by facebook &... */}
          <Box
            sx={{
              display: "flex",
              my: 5,
            }}
          >
            {" "}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              padding: 0,
              mt: 1,
            }}
          >
            <Link href="#" variant="body2" underline="hover">
              Forgot password?
            </Link>
            <Typography variant="body2">
              {"Don’t have an account?"}{" "}
              <Link href="#" variant="body2" underline="hover">
                {"Create Account"}
              </Link>
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              px: 1,
              py: 2,
              borderRadius: "16px",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.93rem",
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
