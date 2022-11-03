import "@abraham/reflection";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html?raw";
import { FirebaseAuthClient } from "./core/authorization/infrastructure/firebaseAuthClient";
import { BasicAuthService } from "./core/authorization/application/auth.service";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) =>
    import(
      /* @vite-ignore */
      // @ts-ignore
      name
      )
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

// Authorization validation
const authClient = new FirebaseAuthClient();
const authService = new BasicAuthService(authClient);

authService.onAuthStateChanged((user) => {
  // // TODO route should be in a config
  // if (user && window.location.pathname !== "/login") return;
  // const origin = window.location.origin;
  // // TODO route should be in a config
  // window.location.replace(origin + "/login");
  console.log("QXC authed", user);
});

