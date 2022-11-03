import { IAuthService } from "../application/auth.service";
import useService from "../../shared/application/useService";
import AuthTypes from "../infrastructure/DI/auth.types";

const useAuthService: () => [IAuthService] = () => {
  const authService = useService<IAuthService>(AuthTypes.AuthService);

  return [authService];
};

export default useAuthService;
