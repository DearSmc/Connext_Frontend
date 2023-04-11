import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcrypt";

import {
  CssBaseline,
  Container,
  Box,
  Link,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthApiCall } from "../../services/Auth/auth";
import { IUserCredential } from "../../types/User";
import { regexValidator } from "../../utils/regexValidator";

export default function index() {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<IAlertType>({
    alertMsg: "",
    showAlert: false,
    alertType: "error",
  });

  interface IAlertType {
    alertMsg: String;
    showAlert: Boolean;
    alertType: "error" | "success" | "warning" | "info";
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    // Ref: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
    // Generate a salt
    const salt = bcrypt.genSaltSync(10);
    // Hash the password
    const hashedPassword = bcrypt.hashSync(data.get("password"), salt);

    let input = {
      email: data.get("email"),
      password: hashedPassword,
    };
    if (validateLoginData(input)) {
      AuthApiCall.login(input)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            setAlertInfo({
              alertMsg: "Login Success",
              showAlert: true,
              alertType: "success",
            });
            localStorage.setItem("accessToken", res.data.accessToken);
            navigate("/");
          } else {
            setAlertInfo({
              alertMsg: res.data.message || res,
              showAlert: true,
              alertType: "error",
            });
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setAlertInfo({
        alertMsg: "Your email or password are incorrect format",
        showAlert: true,
        alertType: "error",
      });
    }
  };

  function validateLoginData({ email, password }: IUserCredential): boolean {
    if (typeof email === "string" && typeof password === "string") {
      return regexValidator.email(email) && regexValidator.password(password);
    }
    return false;
  }

  // TODO: implement remember me logic

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Alert
        severity="error"
        style={!alertInfo.showAlert ? { display: "none" } : {}}
      >
        {alertInfo.alertMsg}
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
            inputProps={{ maxLength: 50 }}
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
            onChange={() =>
              setAlertInfo({
                alertMsg: "",
                showAlert: false,
                alertType: "error",
              })
            }
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
            inputProps={{ maxLength: 50 }}
            sx={{
              "& fieldset": {
                borderRadius: "16px",
              },
            }}
            onChange={() =>
              setAlertInfo({
                alertMsg: "",
                showAlert: false,
                alertType: "error",
              })
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* TODO: Login by facebook &... */}
          {/* TODO: add information button for user when input password */}
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              <span>LOGIN</span>
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
