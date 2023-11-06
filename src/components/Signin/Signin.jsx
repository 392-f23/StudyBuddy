import React from "react";
import { Button, Stack } from "@mui/material";
import { FirebaseSignIn, useAuth } from "../../utilities/firebase";
import { useDbData } from "../../utilities/firebase";
import { useEffect, useState } from "react";
import InfoDialog from "../Dialog/Dialog";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import "./Signin.css";

export const Signin = () => {
  const navigate = useNavigate();
  const [user] = useAuth();

  const [userData, error] = useDbData("/users");

  useEffect(() => {
    // 1. Sign in (not currently in database) - need to check if in DB, then fill out form
    // 2. Sign in (in database) - need to check if in DB
    // 3. If signs in but does not fill out form, DO NOT PUT IN DB
    if (user && user.uid && typeof userData !== "undefined") {
      const uids = Object.keys(userData);

      if (uids.includes(user.uid)) {
        console.log("we already logged in before");
        navigate("/feed");
      } else {
        console.log("we did not log in before");
        navigate("/signup");
      }
    }
  }, [user, userData]);

  return (
    <Stack>
      <div>Logo</div>;<Button onClick={FirebaseSignIn}>Sign in</Button>
    </Stack>
  );
};
