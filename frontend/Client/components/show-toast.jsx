import { Toast, ToastDescription, ToastTitle } from "./ui/toast";

const ShowToast = ({ message, action, description }) => {
  return (
    <Toast
      className={`${action === "error" ? "bg-red-600" : "bg-green-600"} mb-2`}
    >
      <ToastTitle className="font-Nunito-Bold">{message}</ToastTitle>
      {description && <ToastDescription>{description}</ToastDescription>}
    </Toast>
  );
};

export default ShowToast;
