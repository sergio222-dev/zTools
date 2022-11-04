import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import LoginForm from "@organism/LoginForm";
import "@styles/app.scss";

import { BuildContainer } from "./core/shared/infrastructure/DI/container";
import { ContainerContext } from "./app/context/container.context";

const container = BuildContainer();

export default function Root(props: any) {
  document.title = "Ztools login form";
  return (
    <ContainerContext.Provider value={container}>
      {/*https://github.com/mui/material-ui/issues/24109*/}
      <StyledEngineProvider injectFirst>
        <LoginForm />
      </StyledEngineProvider>
    </ContainerContext.Provider>
  );
}
