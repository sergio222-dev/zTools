import { createContext, useContext } from "react";
import { Container } from "inversify";

export const ContainerContext = createContext<Container | undefined>(undefined);

export const useContainer = () =>
  useContext<Container | undefined>(ContainerContext);
