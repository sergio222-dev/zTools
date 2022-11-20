// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { AiOutlineGithub } from "react-icons/ai";
import styles from "./styles.module.scss";

type GithubButtonProperties = ButtonProps;

const Github = ({ ...rest }: GithubButtonProperties) => {
  return (
    <Button fullWidth {...rest} className={`${styles["github-provider-button"]}`} startIcon={<AiOutlineGithub />}>
      Github
    </Button>
  );
};

export default Github;
