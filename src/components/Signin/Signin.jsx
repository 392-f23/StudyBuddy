import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { FirebaseSignIn, useAuth } from "../../utilities/firebase";
import { useDbUpdate, useDbData } from "../../utilities/firebase";
import InfoDialog from "../Dialog/Dialog";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import "./Signin.css";

export const Signin = () => {
  const navigate = useNavigate();
  const [user] = useAuth();
  const [userData, error] = useDbData("/users");

  const checkSignInStatus = () => {
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
  };

  const signInWithFirebase = async () => {
    try {
      await FirebaseSignIn();
    } catch (error) {
      // Handle any sign-in errors
      console.error("Sign-in error:", error);
    }
  };

  useEffect(() => {
    checkSignInStatus(); // Check the sign-in status when user and userData are available
  }, [user, userData]);

  return (
    <Stack className="signinstack">
      <img className="logoimg" src="../../../sb_logo.png" />
      <Button onClick={signInWithFirebase}>Sign in</Button>
    </Stack>
  );
};
