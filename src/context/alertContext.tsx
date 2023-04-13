// AlertContext.tsx
import React, { createContext, useState } from "react";
import {
  IAlertInfo,
  IHandleAlert,
  IHandleAlertChange,
} from "../components/alertType";

// Define a context for the alert and the handleAlertChange function
export const AlertContext = createContext<{
  alertInfo: IAlertInfo;
  handleAlertChange: IHandleAlertChange;
}>({
  alertInfo: { showAlert: false, alertType: "error", alertMsg: "ccc" },
  handleAlertChange: () => {},
});

type Props = {
  children: JSX.Element;
};
// Create a provider component for the AlertContext
export const AlertProvider: React.FC<Props> = ({ children }: Props) => {
  const [alertInfo, setAlertInfo] = useState<IAlertInfo>({
    showAlert: false,
    alertType: "error",
    alertMsg: "",
  });

  const handleAlertChange: IHandleAlertChange = ({
    type,
    msg,
  }: IHandleAlert = {}) => {
    msg && type
      ? setAlertInfo({
          alertMsg: msg,
          showAlert: true,
          alertType: type,
        })
      : setAlertInfo({
          alertMsg: "",
          showAlert: false,
          alertType: "error",
        });
  };
  // Provide the alert and handleAlertChange value to the children components
  return (
    <AlertContext.Provider value={{ alertInfo, handleAlertChange }}>
      {children}
    </AlertContext.Provider>
  );
};
