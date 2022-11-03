import { Container } from "inversify";
import AuthService, { IAuthService } from "../../application/auth.service";
import AuthTypes from "./auth.types";

const BindAuth = (container: Container) => {
  container.bind<IAuthService>(AuthTypes.AuthService).to(AuthService).inSingletonScope();
};

export default BindAuth;
