import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    console.log('====================================')
    console.error(err)
    console.log(info)
    console.log(props)
    console.log('====================================')
    return React.createElement("div",{}, "Error loading Login Micro Frontend 💀💀💀");
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
