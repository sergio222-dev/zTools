import React from "react";
import "@styles/app.scss";

import {BuildContainer} from "./core/shared/infrastructure/DI/container";
import {ContainerContext} from "./app/context/container.context";

const container = BuildContainer();

export default function Root(props: any) {
  // Set tittle app
  document.title = "Ztools login form";

  return (
    <></>
  )
    ;
}
