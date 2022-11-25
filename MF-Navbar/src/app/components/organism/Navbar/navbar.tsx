import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import useAuthClient from "@core/auth/presentation/use-auth.hook";

const Navbar = () => {
  // SERVICES
  const [authService] = useAuthClient();

  const user = authService.getUser();

  // HANDLERS
  const handleLogout = async () => {
    await authService.signOut();
  };

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>Home</Typography>
          </Box>
          <Typography>{user?.email}</Typography>
          <div>
            <Button onClick={handleLogout} color='inherit' variant='outlined'>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
