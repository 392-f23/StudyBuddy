import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { FirebaseSignIn, useAuth } from "../../utilities/firebase";
import { useDbData } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#4E2A84;'
  }));

  return (
    <Stack className="signinstack">
      <img className="logoimg" src="../../../sb_logo.png" />
      <ColorButton onClick={signInWithFirebase}>Sign in</ColorButton>
    </Stack>
  );
};
