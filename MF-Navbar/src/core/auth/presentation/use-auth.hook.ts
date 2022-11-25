import useService from "../../shared/application/use-service";
import AuthTypes from "../infrastructure/DI/auth.types";
import { AuthClient } from "zauth-utility-module";

const useAuthClient: () => [AuthClient] = () => {
  const authClient = useService<AuthClient>(AuthTypes.AuthClient);

  return [authClient];
};

export default useAuthClient;
