import React from "react";
import { Button, Stack } from "@mui/material";
import { FirebaseSignIn, useAuth } from "../../utilities/firebase";

export const Signin = () => {
  const [user] = useAuth();

  console.log(user);
  return (
    <Stack>
      <div>Logo</div>
      <Button onClick={FirebaseSignIn}>Sign in</Button>
    </Stack>
  );
};
