import React, { EventHandler, useEffect } from "react";
import {Button, Paper, useTheme, Container, Box, TextField, Alert} from "@mui/material";
import styles from "./LoginForm.module.scss";
import {Github} from "../../atom/ButtonProvider";

const LoginForm: React.FC = () => {
  const theme = useTheme();

  // const [authService] = useAuthHook();
  //
  const handlerTest = (e: React.FormEvent) => {
    e.preventDefault();

    ZAuth.getClient().;
  };
  //
  // const handleLogOut = () => {
  //   authService.signOut();
  // };

  useEffect(() => {
    // authService.getUser().then(a => console.log(a));
    console.log("MF", ZAuth.getClient());
    console.log("location", window.location.pathname);
  }, []);

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
            <Github onClick={handlerTest} />
          </Box>
          {/*<Button onClick={handleLogOut}>SignOut</Button>*/}
        </Paper>
      </Box>
    </div>
  );
};

export default LoginForm;
