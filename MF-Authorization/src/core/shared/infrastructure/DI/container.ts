import { Container } from "inversify";
import BindAuth from "@core/auth/infrastructure/DI/binds";

export const BuildContainer = () => {
  const container = new Container();

  // binds
  BindAuth(container);

  return container;
};
