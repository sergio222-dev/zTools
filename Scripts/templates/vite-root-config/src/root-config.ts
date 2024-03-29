import "@abraham/reflection";
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html?raw";
import { FirebaseAuthClient, AuthService } from "zauth-utility-module";

// initialize the SPA
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

// Authorization initialization with Firebase

const firebaseConfig = {
  apiKey: import.meta.env.VITE_MF_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_MF_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_MF_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_MF_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MF_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_MF_FIREBASE_APP_ID
};

const authClient = new FirebaseAuthClient(firebaseConfig);

// share the client between all instance
const instance = AuthService.getInstance();
instance.setClient(authClient);

authClient.onAuthStateChanged((user) => {
  // TODO route should be in a config
  if (user && window.location.pathname === "/login") {
    const origin = window.location.origin;
    window.location.replace(origin + "/");
  }
  if (!user && window.location.pathname !== "/login") {
    const origin = window.location.origin;
    window.location.replace(origin + "/login");
  }

  start();
});

