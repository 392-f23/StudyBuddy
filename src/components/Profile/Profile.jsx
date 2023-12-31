import Banner from "../Banner/Banner";
import "./Profile.css";
import {
  Typography,
  Stack,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  TextField,
} from "@mui/material";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MuiTelInput } from "mui-tel-input"; //https://www.npmjs.com/package/mui-tel-input
import { FirebaseSignOut } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDbData, useDbUpdate } from "../../utilities/firebase";

const Profile = () => {
  const auth = getAuth();
  const [uid, setUid] = useState("");
  const [coursesFromDB, result3] = useDbData("/courses");
  const [setupCourses, setSetupCourses] = useState([]);

  useEffect(() => {
    if (coursesFromDB) {
      setSetupCourses(Object.keys(coursesFromDB).slice(700, 900));
    }
  }, [coursesFromDB]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("auth errors out.");
      }
    });
    return () => unsubscribe();
  }, []);
  const [userData, setUserData] = useDbData("/users/" + uid);
  // console.log(userData)
  const [updateData, result] = useDbUpdate("/users/" + uid);
  const navigate = useNavigate();

  const signOut = () => {
    FirebaseSignOut();
    navigate("/");
  };

  const [year, setYear] = useState("");
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const [phone, setPhone] = React.useState("");
  const handleChangePhone = (newValue) => {
    setPhone(newValue);
  };

  const [mode, setMode] = React.useState("");
  const handleChangeMode = (event) => {
    setMode(event.target.value);
  };

  const [view, setView] = React.useState("");
  const handleChangeView = (event) => {
    setView(event.target.value);
  };

  const [major, setMajor] = React.useState("");
  const handleChangeMajor = (event, value) => {
    setMajor(value);
  };

  const [courses, setCourses] = React.useState([""]);
  const handleChangeCourses = (event, value) => {
    setCourses(value);
  };

  const [userDisplayName, setUserDisplayName] = React.useState("");

  useEffect(() => {
    if (typeof userData !== "undefined") {
      setYear(userData.year);
      setPhone(userData.phoneNumber);
      setMajor(userData.major);
      setMode(userData.mode);
      setView(userData.profileType);
      setCourses(userData.courses);
      setUserDisplayName(userData.displayName);
    }
  }, [userData]);

  const [canClickEdit, setCanClickEdit] = useState(true);

  const enableEditingView = () => {
    setCanClickEdit(false);
  };

  const [save, setSave] = useState(true);

  const cancelEdit = () => {
    setSave(false);
    setCanClickEdit(true);
    window.location.reload(false); //jank but works for now
  }

  const enableSave = () => {
    setSave(false);
    setCanClickEdit(true);
    console.log(year, phone, mode, major, view, courses);

    const newstate = {
      year: year,
      phoneNumber: phone,
      mode: mode,
      major: major,
      profileType: view,
      courses: courses,
    };

    updateData(newstate);
    console.log(result);
  };

  const form_style = {
    width: "100%",
    maxWidth: "20rem",
    // bgcolor: "background.paper",
    borderRadius: "4px",
    margin: "0.5rem 0",
    padding: "0",
  };

  const courses_styles = {
    style2 : {
      width: "100%",
      maxWidth: "20rem",
      bgcolor: "background.paper",
      borderRadius: "5px",
      marginBottom: "1rem",
      marginTop: "0",
  }};

  return (
    <Container maxWidth="sm" className="main-container">
      <Stack className="main">
        <div className="profile-header">
          <Avatar
            className="profile-pic"
            sx={{
              width: 40,
              height: 40,
            }}
            src={userData ? userData.photoURL : ""}
          ></Avatar>
          <h5>{userDisplayName}</h5>
        </div>
        <div className="edit-btn-div">
        {"   "}
        {canClickEdit ? (
          <Button
            size="small"
            variant="outlined"
            onClick={enableEditingView}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={cancelEdit}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        )}
        </div>
        <Container sx={form_style} >
          <FormControl variant="filled" className="profile-field">
            <InputLabel id="simple-select">Graduation Year</InputLabel>
            <Select
              labelId="simple-select"
              id="simple-select-field"
              value={year}
              onChange={handleChangeYear}
              inputProps={{ readOnly: canClickEdit }}
            >
              <MenuItem value={"2023"}>2023</MenuItem>
              <MenuItem value={"2024"}>2024</MenuItem>
              <MenuItem value={"2025"}>2025</MenuItem>
              <MenuItem value={"2026"}>2026</MenuItem>
              <MenuItem value={"2027"}>2027</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <MuiTelInput
            className="profile-field"
            inputProps={{ readOnly: canClickEdit, label: "Phone Number" }}
            variant="filled"
            sx={{ width: "100%" }}
            defaultCountry="us"
            value={phone}
            onChange={handleChangePhone}
          />

          <Autocomplete
            className="profile-field"
            // id="tags-filled"
            onChange={handleChangeMajor}
            options={[
              "Anthropology",
              "Art History",
              "Biology",
              "Computer Science",
              "Geology",
              "History",
              "Literature",
              "Math",
            ]}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            readOnly={canClickEdit}
            value={major}
            renderInput={(params) => (
              <TextField
                className="text-class"
                variant="filled"
                label="Major"
                {...params}
              />
            )}
          />
          <FormControl variant="filled" className="profile-field">
            <InputLabel id="simple-select">Mode Preference</InputLabel>
            <Select
              labelId="simple-select"
              id="simple-select-field"
              value={mode}
              onChange={handleChangeMode}
              inputProps={{ readOnly: canClickEdit }}
            >
              <MenuItem value={"Remote"}>Remote</MenuItem>
              <MenuItem value={"In-person"}>In-person</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" className="profile-field">
            <InputLabel id="simple-select">Profile Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="simple-select-field"
              value={view}
              onChange={handleChangeView}
              inputProps={{ readOnly: canClickEdit }}
            >
              <MenuItem value={"Public"}>Public View</MenuItem>
              <MenuItem value={"Anonymous"}>Anonymous</MenuItem>
            </Select>
          </FormControl>
        </Container>
        <Autocomplete
          sx={courses_styles.style2}
          multiple
          size="small"
          id="tags-outlined"
          onChange={handleChangeCourses}
          options={setupCourses}
          getOptionLabel={(option) => option}
          // filterSelectedOptions
          readOnly={canClickEdit}
          value={courses}
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Selected Courses" />
          )}
        />
        {canClickEdit ? 
        (<Button 
          size="small" 
          variant="contained" 
          onClick={signOut}>
          Sign Out
        </Button>) :
        (<Button
          size="small"
          variant="contained"
          onClick={enableSave}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>)}
      </Stack>
      <Banner />
    </Container>
  );
};

export default Profile;
