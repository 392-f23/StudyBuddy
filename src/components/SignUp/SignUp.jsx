import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Alert,
} from "@mui/material";
import Banner from "../Banner/Banner";
import "./SignUp.css";
import { useState } from "react";
import { useAuth } from "../../utilities/firebase";
import { useDbUpdate } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [mode, setMode] = useState("");
  const [profileType, setProfileType] = useState("");
  const [number, setNumber] = useState("");
  const [courses, setCourses] = useState("");
  const [availability, setAvailability] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [user] = useAuth();
  const [updateUsers, result] = useDbUpdate("/users");
  const navigate = useNavigate();

  const submitForm = () => {
    if (
      year === "" ||
      major === "" ||
      mode === "" ||
      profileType === "" ||
      courses === "" ||
      availability === ""
    ) {
      setShowAlert(true);
      return;
    }

    const userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      year: year,
      major: major,
      mode: mode,
      profileType: profileType,
      phoneNumber: number,
      courses: courses,
      availability: availability,
    };

    updateUsers({ [user.uid]: userData });

    setShowAlert(false);
    navigate("/feed");
  };

  return (
    <Stack spacing={3} style={{ padding: 20 }}>
      <h2 className="sign-up-title">StudyBuddy Account Information</h2>

      {showAlert && (
        <Alert severity="error">Fill in all required fields.</Alert>
      )}

      <TextField
        onChange={(e) => setYear(e.target.value)}
        value={year}
        id="outlined-basic"
        placeholder="Grad Year (e.g. 2024) *"
        variant="outlined"
        required
      />

      <TextField
        onChange={(e) => setMajor(e.target.value)}
        value={major}
        id="outlined-basic"
        placeholder="Major (e.g. Computer Science) *"
        variant="outlined"
        required
      />

      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Mode"
          onChange={(e) => setMode(e.target.value)}
        >
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="In-Person">In-Person</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">Profile Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profileType}
          label="Profile Type"
          onChange={(e) => setProfileType(e.target.value)}
        >
          <MenuItem value="Anonymous">Anonymous</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
        </Select>
      </FormControl>

      <TextField
        onChange={(e) => setCourses(e.target.value)}
        value={courses}
        id="outlined-basic"
        variant="outlined"
        required
        placeholder='Courses (list 1-5 in this format: "CHEM 151, MATH 250, COMP_SCI 392, COMP_SCI 330")'
        multiline
        rows={4}
      />

      <TextField
        onChange={(e) => setAvailability(e.target.value)}
        value={availability}
        id="outlined-basic"
        variant="outlined"
        required
        placeholder='Default Availability (list availible time slots in this format: "MWF 05:00-07:00 pm, TuTh 10:00-11:00 am")'
        multiline
        rows={2}
      />

      <TextField
        onChange={(e) => setNumber(e.target.value)}
        value={number}
        id="outlined-basic"
        placeholder="Phone Number (optional)"
        variant="outlined"
        required
      />

      <Button onClick={submitForm} variant="contained">
        Submit
      </Button>
    </Stack>
  );
};
