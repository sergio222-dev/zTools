import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { AiOutlineGithub } from "react-icons/ai";
import styles from "./styles.module.scss";

interface GithubButtonProps extends ButtonProps {}

const Github = ({ ...rest }: GithubButtonProps) => {
  console.log("Github ", styles);
  return (
    <Button
      fullWidth

      {...rest}
      className={`${styles["github-provider-button"]}`}
      startIcon={<AiOutlineGithub />}
    >
      Github
    </Button>
  );
};

export default Github;
