import { useState, useContext } from "react";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import { Container } from "@mui/system";
import { AlertContext } from "../../context/alertContext";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { regexValidator } from "../../utils/regexValidator";
import { IUserInfo, IUserRegisterInfo } from "../../types/User";
import { SHA256 } from "crypto-js";
import { AuthApiCall } from "../../services/Auth/auth";
import { Theme, useTheme } from "@mui/material/styles";
import { UserApiCall } from "../../services/User/user";
import { useNavigate } from "react-router-dom";

type Props = {};

function index({}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { handleAlertChange } = useContext(AlertContext);
  const [loading, setIsLoading] = useState<boolean>(false);
   const [career, setCareer] = useState("");
  const [bDay, setBDay] = useState<Dayjs | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [interested, setInterested] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [didFetch, setDidFetch] = useState<boolean>(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const INTERESTED_TOPIC = ["Business", "Marketing", "Finance", "Technology"];

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    let input: IUserRegisterInfo = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: (document.getElementById("password") as HTMLInputElement).value,
      confirmPassword: (
        document.getElementById("confirmPassword") as HTMLInputElement
      ).value,
      bornDate: bDay,
    };
    console.log(input);

    if (validateRegisterInfo(input)) {
      delete input["confirmPassword"];

      console.log(input);
      hashPassword(input);
      AuthApiCall.register(input).then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          handleAlertChange({
            type: "success",
            msg: "Register Process Successfully",
          });
          let token = res.data.accessToken;

          UserApiCall.getUserInfo(token).then((res) => {
            if (res.status === 200) {
              setUserInfo(res.data);
              setDidFetch(true);
              localStorage.setItem("accessToken", token);
            } else {
              navigate("/");
            }
          });
        } else {
          handleAlertChange({ type: "error", msg: res.data.message || res });
        }
      });
    }
    setIsLoading(false);
  };

  function validateRegisterInfo({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    bornDate,
  }: IUserRegisterInfo): boolean {
    if (
      typeof firstName === "string" &&
      typeof lastName === "string" &&
      typeof email === "string" &&
      bornDate != null
    ) {
      if (!regexValidator.name(firstName)) {
        handleAlertChange({
          type: "error",
          msg: "First name have to contain 2-50 characters",
        });
        return false;
      }
      if (!regexValidator.name(lastName)) {
        handleAlertChange({
          type: "error",
          msg: "Last name have to contain 2-50 characters",
        });
        return false;
      }
      if (!regexValidator.email(email)) {
        handleAlertChange({
          type: "error",
          msg: "Your email is incorrect format : xxx@xxx.xxx",
        });
        return false;
      }
      if (!regexValidator.password(password)) {
        handleAlertChange({
          type: "error",
          msg: "Password have to contain 8-50 letter with upper case, lower case and digit not allow for special characters",
        });
        return false;
      }
      if (password !== confirmPassword) {
        handleAlertChange({
          type: "error",
          msg: "Confirm password is incorrect",
        });
        return false;
      }
      if (!regexValidator.bornDate(bornDate)) {
        handleAlertChange({
          type: "error",
          msg: "Your birth date incorrect [Age more than 5]",
        });
        return false;
      }

      handleAlertChange({});
      return true;
    }
    handleAlertChange({
      type: "error",
      msg: "Please input required filed",
    });
    return false;
  }

  function hashPassword(payload: IUserRegisterInfo): void {
    payload.password = payload.password.trim();
    if (payload.password !== "") {
      payload.password = SHA256(payload.password).toString();
    }
  }

  function getStyles(
    topic: string,
    INTERESTED_TOPIC: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        INTERESTED_TOPIC.indexOf(topic) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSelectTopic = (event: SelectChangeEvent<typeof interested>) => {
    const {
      target: { value },
    } = event;
    setInterested(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" sx={{ textAlign: "left" }}>
        Create New Account
      </Typography>

      { didFetch &&
      userInfo ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: 400 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FormControl
              sx={{
                minWidth: 200,
                width: "100%",
                display: "flex",
                justifyContent: "start",
                my: 1,
                "& fieldset": {
                  borderRadius: "16px",
                },
              }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Career
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="select-helper"
                value={career}
                label="Career"
                onChange={(event) => setCareer(event.target.value)}
              >
                <MenuItem value="student">
                  <em>Student</em>
                </MenuItem>
                <MenuItem value="privateCompanyEmployees">
                  Private Company Employees
                </MenuItem>
                <MenuItem value="stateEnterpriseEmployees">
                  State Enterprise Employees
                </MenuItem>
                <MenuItem value="civilServant">Civil Servant</MenuItem>
                <MenuItem value="factoryWorkers">Factory Workers</MenuItem>
                <MenuItem value="businessOwner">Business Owner</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                minWidth: 200,
                width: "100%",
                display: "flex",
                my: 1,
                justifyContent: "start",
                "& fieldset": {
                  borderRadius: "16px",
                },
              }}
            >
              <InputLabel id="demo-multiple-chip-label">
                Interested topic
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={interested}
                onChange={handleSelectTopic}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {INTERESTED_TOPIC.map((topic) => (
                  <MenuItem
                    key={topic}
                    value={topic}
                    style={getStyles(topic, INTERESTED_TOPIC, theme)}
                  >
                    {topic}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="text"
              id="firstName"
              autoComplete="first-name"
              inputProps={{ maxLength: 50 }}
              sx={{
                mr: 2,
                "& fieldset": {
                  borderRadius: "16px",
                },
              }}

              // TODO: validate onMouseLeft
              // onBlur={(e) => regexValidator.name(e.target.value)}
              // error={(e) => !regexValidator.name(e.target.value)}
              // helperText="Please specify the first name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              id="lastName"
              autoComplete="last-name"
              inputProps={{ maxLength: 50 }}
              sx={{
                "& fieldset": {
                  borderRadius: "16px",
                },
              }}
            />
          </Box>

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
          />
          <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              fullWidth={true}
              sx={{
                "& fieldset": {
                  borderRadius: "16px",
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showCPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showCPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              fullWidth={true}
              sx={{
                "& fieldset": {
                  borderRadius: "16px",
                },
              }}
            />
          </FormControl>
          {/* <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        inputProps={{ maxLength: 50 }}
        sx={{
          "& fieldset": {
            borderRadius: "16px",
          },
        }}
        onChange={() => handleAlertChange({})}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="confirmPassword"
        type="password"
        id="confirmPassword"
        inputProps={{ maxLength: 50 }}
        sx={{
          "& fieldset": {
            borderRadius: "16px",
          },
        }}
        onChange={() => handleAlertChange({})}
      /> */}
          <Box sx={{ mt: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Date of birth"
                  value={bDay}
                  defaultValue={dayjs("2005-05-01")}
                  defaultCalendarMonth={dayjs("2005-05-01")}
                  slotProps={{
                    textField: {
                      helperText: "MM/DD/YYYY",
                    },
                  }}
                  onChange={(newValue) => setBDay(newValue)}
                  sx={{
                    width: "100%",
                    "& fieldset": {
                      borderRadius: "16px",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 2,
            }}
          >
            {"Have an account?"}{" "}
            <Link href="/login" variant="body2" underline="hover">
              {"Login"}
            </Link>
          </Typography>
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
              <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                REGISTER
              </Typography>
            )}
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default index;
