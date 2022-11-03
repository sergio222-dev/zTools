import {createContext, useContext} from "react";
import {Container} from "inversify";

export const ContainerContext = createContext<Container | null>(null);

export const useContainer = () => useContext<Container | null>(ContainerContext);
