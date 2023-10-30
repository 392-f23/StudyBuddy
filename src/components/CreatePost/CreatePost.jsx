import React from "react";
import { Stack, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import Banner from "../Banner/Banner";

export const CreatePost = () => {
    const [showAlert, setShowAlert] = useState(false);

    const submitPost = () => {
        setShowAlert(true)
    }
  return (
    <Stack spacing={3} style={{ padding: 20 }}>
      <h2>Make a post</h2>

      {showAlert && <Alert severity="success">You have successfully created a post</Alert>}

      <TextField id="outlined-basic" label="Title" variant="outlined" />
      <TextField
        id="outlined-basic"
        label="Description"
        multiline
        variant="outlined"
      />
      <TextField id="outlined-basic" label="Class" variant="outlined" />
      <TextField id="outlined-basic" label="Location" variant="outlined" />
      <Button onClick={submitPost} variant="contained" disabled>Create</Button>
      <Banner/>
    </Stack>
  );
};
