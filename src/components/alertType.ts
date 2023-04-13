// ? = can be undefined
interface IHandleAlert {
  type?: "error" | "success" | "warning" | "info";
  msg?: String;
}

interface IAlertInfo {
  showAlert: Boolean;
  alertType: "error" | "success" | "warning" | "info";
  alertMsg: String;
}

type IHandleAlertChange = ({ type, msg }: IHandleAlert) => void;

export type { IHandleAlert, IAlertInfo, IHandleAlertChange };
