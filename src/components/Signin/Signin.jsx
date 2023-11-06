import React from "react";
import { Button, Stack } from "@mui/material";
import { FirebaseSignIn, useAuth } from "../../utilities/firebase";
import { useDbUpdate, useDbData } from "../../utilities/firebase";
import { useEffect } from "react";

export const Signin = () => {
  const [user] = useAuth();

  const [update, result] = useDbUpdate(`/users/${user ? user.uid : "unknown"}`);
  const [getDbData, users] = useDbData(`/users/${user ? user.uid : "unknown"}`);


  const signInGeneral = () => {

  }

  useEffect(() => {
    // 1. Sign in (not currently in database) - need to check if in DB, then fill out form
    // 2. Sign in (in database) - need to check if in DB
    // 3. If signs in but does not fill out form, DO NOT PUT IN DB
    if (user && user.uid) {
      console.log(getDbData);
    }
  }, [user]);

  return (
    <Stack>
      <div>Logo</div>
      <Button onClick={FirebaseSignIn}>Sign in</Button>
    </Stack>
  );
};
