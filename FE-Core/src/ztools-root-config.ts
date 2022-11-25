import "@abraham/reflection";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
// eslint-disable-next-line import/no-unresolved
import microfrontendLayout from "./microfrontend-layout.html?raw";
import {
  FirebaseAuthClient,
  AuthService,
  AuthClient,
} from "zauth-utility-module";

// initialize the SPA
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => {
    return import(
      /* @vite-ignore */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name
    );
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

for (const element of applications) {
  if (element.name === "@ztools/mf-navbar") {
    element.activeWhen = location => !location.pathname.startsWith("/login");
  }
  registerApplication(element);
}
layoutEngine.activate();

// Authorization initialization
const firebaseConfig = {
  apiKey: import.meta.env.VITE_MF_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_MF_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_MF_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_MF_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MF_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_MF_FIREBASE_APP_ID,
};

const authClient: AuthClient = new FirebaseAuthClient(firebaseConfig);

// share the client between all instance
const instance = AuthService.getInstance();
instance.setClient(authClient);

authClient.onAuthStateChanged(user => {
  // TODO route should be in a config
  if (user && window.location.pathname === "/login") {
    const origin = window.location.origin;
    window.location.replace(origin + "/");
    return;
  }
  if (!user && window.location.pathname !== "/login") {
    const origin = window.location.origin;
    window.location.replace(origin + "/login");
    return;
  }

  start();
});
