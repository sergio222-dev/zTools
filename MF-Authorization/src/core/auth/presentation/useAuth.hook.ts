import useService from "../../shared/application/useService";
import AuthTypes from "../infrastructure/DI/auth.types";
import { AuthClient } from "zauth-utility-module/dist/types/AuthClient";

const useAuthClient: () => [AuthClient] = () => {
  const authClient = useService<AuthClient>(AuthTypes.AuthClient);

  return [authClient];
};

export default useAuthClient;
