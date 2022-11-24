import { Container } from "inversify";
import { AuthService, AuthClient } from "zauth-utility-module";
import AuthTypes from "./auth.types";

const BindAuth = (container: Container) => {
  container
    .bind<AuthClient>(AuthTypes.AuthClient)
    .toConstantValue(AuthService.getInstance().getClient());
};

export default BindAuth;
