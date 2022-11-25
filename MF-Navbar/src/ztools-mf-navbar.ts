import React, { createElement } from "react";
import ReactDOM from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ReactDOM,
  rootComponent: Root,
  errorBoundary(error, info, properties) {
    console.log("====================================");
    console.error(error);
    console.log(info);
    console.log(properties);
    console.log("====================================");
    return createElement(
      "div",
      {},
      "Error loading Login Micro Frontend 💀💀💀",
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
