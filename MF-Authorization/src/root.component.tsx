import React from "react";
import LoginForm from "@organism/LoginForm";
import "@styles/app.scss";

export default function Root(props: any) {
  document.title = "Ztools login form";
  return <LoginForm /> ;
}
