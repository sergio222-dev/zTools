import React from "react";
import { Button, Paper, useTheme, Container, Box, TextField } from "@mui/material";
import styles from "./LoginForm.module.scss";

const LoginForm: React.FC = () => {
  const theme = useTheme();

  return (
    <div className={styles['login-container']}>
      <Box>
        <Paper
          elevation={4}
          sx={{
            padding: theme.spacing(2),
            textAlign: "center",
          }}
        >
          <h1>Ztools 🗡</h1>
          <form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                label="Username"
                placeholder="secret user name 🧑"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                label="Password"
                placeholder="secret password 🔒"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Box>
            <Button type="submit">Enter</Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

LoginForm.defaultProps ={
  a: "asd",
}

export default LoginForm;
