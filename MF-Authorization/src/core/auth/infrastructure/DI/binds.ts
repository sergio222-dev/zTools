import { Container } from "inversify";
import { AuthService } from "zauth-utility-module";
import { AuthClient } from "zauth-utility-module/dist/types/AuthClient";
import AuthTypes from "./auth.types";

const BindAuth = (container: Container) => {
  container.bind<AuthClient>(AuthTypes.AuthClient).toConstantValue(AuthService.getInstance().getClient())
};

export default BindAuth;
