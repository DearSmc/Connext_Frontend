export interface IAlertType {
  alertMsg : String;
  showAlert: Boolean;
  alertType: "error" | "success" | "warning" | "info";
}