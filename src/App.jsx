import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { Grid } from "@mui/material";

const App = () => {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={8}>
         <div>banner</div>
        </Grid>
        <Grid item xs={8}>
          <div>rest of the screen</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
