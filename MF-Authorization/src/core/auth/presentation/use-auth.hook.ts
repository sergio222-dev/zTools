import useService from "../../shared/application/use-service";
import AuthTypes from "../infrastructure/DI/auth.types";
// eslint-disable-next-line import/no-unresolved
import { AuthClient } from "zauth-utility-module/dist/types/AuthClient";

const useAuthClient: () => [AuthClient] = () => {
  const authClient = useService<AuthClient>(AuthTypes.AuthClient);

  return [authClient];
};

export default useAuthClient;
