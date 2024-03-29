import React from "react";
import { Paper, useTheme, Box } from "@mui/material";
import styles from "./LoginForm.module.scss";
import { Github } from "@atom/ButtonProvider";
import useAuthHook from "@core/auth/presentation/use-auth.hook";

const LoginForm: React.FC = () => {
  const theme = useTheme();

  const [authClient] = useAuthHook();

  const handleLoginWithGithub = async (event: React.FormEvent) => {
    event.preventDefault();
    await authClient.signInGithub();
  };

  return (
    <div className={styles["login-container"]}>
      <Box>
        <Paper
          elevation={4}
          sx={{
            padding: theme.spacing(2),
            textAlign: "center",
          }}
        >
          <h1>Ztools 🗡</h1>
          <Box
            sx={{
              width: 400,
            }}
          >
            <Github onClick={handleLoginWithGithub} />
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default LoginForm;
