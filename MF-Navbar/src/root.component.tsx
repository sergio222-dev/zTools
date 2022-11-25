import React from "react";
import "@styles/app.scss";
import { BuildContainer } from "@core/shared/infrastructure/DI/container";
import { ContainerContext } from "@app/context/container.context";
import Navbar from "@organism/Navbar";

const container = BuildContainer();

export default function Root() {
  return (
    <ContainerContext.Provider value={container}>
      <Navbar />
    </ContainerContext.Provider>
  );
}
