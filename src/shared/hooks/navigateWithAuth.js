import { toast } from "react-toastify";

export const navigateWithAuth = (isAuth, navigate, targetPath) => {
  if (isAuth) {
    navigate(targetPath);
  } else {
    navigate("/signIn");
    toast.warning("Для просмотра этой страницы необходимо авторизоваться");
  }
};
