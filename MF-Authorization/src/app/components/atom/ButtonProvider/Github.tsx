import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { AiOutlineGithub } from "react-icons/ai";
import styles from "./styles.module.scss";

type GithubButtonProps = ButtonProps;

const Github = ({ ...rest }: GithubButtonProps) => {
  return (
    <Button fullWidth {...rest} className={`${styles["github-provider-button"]}`} startIcon={<AiOutlineGithub />}>
      Github
    </Button>
  );
};

export default Github;
