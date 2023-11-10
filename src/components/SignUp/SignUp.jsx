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
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import "./SignUp.css";
import { useEffect, useState } from "react";
import { useAuth, useDbData } from "../../utilities/firebase";
import { useDbUpdate } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

export const SignUp = () => {
  const [coursesFromDB, result3] = useDbData("/courses");
  const [setupCourses, setSetupCourses] = useState([]);

  useEffect(() => {
    if (coursesFromDB) {
      setSetupCourses(Object.keys(coursesFromDB).slice(700,900));
    }
  }, [coursesFromDB]);
  

  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [mode, setMode] = useState("");
  const [profileType, setProfileType] = useState("");
  const [number, setNumber] = useState("");
  const [courses, setCourses] = useState([]);
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
      courses === ""
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
    };

    updateUsers({ [user.uid]: userData });

    setShowAlert(false);
    navigate("/feed");
  };


  const handleCoursesChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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

      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">Courses</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={courses}
          onChange={handleCoursesChange}
          MenuProps={{ style: {maxHeight: 400 }}}
          input={<OutlinedInput label="Name" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {setupCourses.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
