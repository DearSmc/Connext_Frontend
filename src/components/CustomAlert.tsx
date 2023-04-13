import Alert from "@mui/material/Alert";
import { useContext  } from "react";
import { AlertContext } from '../context/alertContext';

const CustomAlert = () => {
  const { alertInfo } = useContext(AlertContext);

  return (
    <Alert
      severity="error"
      style={!alertInfo.showAlert ? { visibility: "hidden" } : {}}
      sx={{
        position: "fixed",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {alertInfo.alertMsg}
    </Alert>
  );
};

export default CustomAlert;

// How to call function
//
// setAlert({ type: "error", msg: "Your email or password are incorrect format" });
// setAlert({ type: "success", msg: "Login Success" });
// setAlert({}    => set to default (not show)
//
