import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import LoginForm from "@organism/LoginForm";
import "@styles/app.scss";

import { BuildContainer } from "./core/shared/infrastructure/DI/container";
import { ContainerContext } from "./app/context/container.context";

const container = BuildContainer();

export default function Root() {
  // Set tittle app
  document.title = "Ztools login form";

  return (
    <StyledEngineProvider injectFirst>
      {/*https://github.com/mui/material-ui/issues/24109*/}
      <ContainerContext.Provider value={container}>
        <LoginForm />
      </ContainerContext.Provider>
    </StyledEngineProvider>
  );
}
