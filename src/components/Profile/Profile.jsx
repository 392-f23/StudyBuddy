import Banner from "../Banner/Banner";
import "./Profile.css";
import { Typography, Stack, Container, Avatar, List, ListItem, ListItemText, Autocomplete, TextField } from "@mui/material";
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MuiTelInput } from 'mui-tel-input' //https://www.npmjs.com/package/mui-tel-input
import { FirebaseSignOut } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const navigate = useNavigate();

  const signOut = () => {
    FirebaseSignOut();
    navigate('/')
  }

  const [year, setYear] = useState('');
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const [phone, setPhone] = React.useState('')
  const handleChangePhone = (newValue) => {
    setPhone(newValue)
  }

  const [mode, setMode] = React.useState('')
  const handleChangeMode = (event) => {
    setMode(event.target.value)
  }

  const [view, setView] = React.useState('')
  const handleChangeView = (event) => {
    setView(event.target.value)
  }

  const [major, setMajor] = React.useState('')
  const handleChangeMajor = (event) => {
    setMajor(event.target.value)
  }

  const [courses, setCourses] = React.useState('')
  const handleChangeCourses = (event) => {
    setCourses(event.target.value)
  }


  const [editing, setEditing] = useState(true);

  const enableEditingView = () => {
    setEditing(false);
  }

  const [save, setSave] = useState(true);

  const enableSave = () => {
    setSave(false);
    setEditing(true);
  }

  const style = {
    width: '100%',
    maxWidth: '20rem',
    bgcolor: 'background.paper',
    borderRadius: '4px',
    marginBottom: '1rem',
    marginTop: '1rem'
  };

  return (
    <Container maxWidth="sm">
      <Stack className="main">
        <Avatar sx={{ width: 60, height: 60, marginBottom: '.5rem'}}></Avatar>
        <Grid container justifyContent="space-evenly">
          <h3>First Last</h3>
          { editing ?
          <Button variant="outlined" onClick={enableEditingView} startIcon={<EditIcon />}>
            Edit
          </Button> :
          <Button variant="outlined" onClick={enableSave} startIcon={<SaveIcon />}>
            Save
          </Button> }
        </Grid>
        <List sx={style}>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  <FormControl variant='filled' sx={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-label">School Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={year}
                      onChange={handleChangeYear}
                      inputProps={{ readOnly: editing }}
                    >
                      <MenuItem value={"Freshman"}>Freshman</MenuItem>
                      <MenuItem value={"Sophomore"}>Sophomore</MenuItem>
                      <MenuItem value={"Junior"}>Junior</MenuItem>
                      <MenuItem value={"Senior"}>Senior</MenuItem>
                      <MenuItem value={"Graduate/Other"}>Graduate/Other</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                <Typography
                  sx={{ width: '100%' }}
                  component="span"
                  variant="body2"
                >
                  <MuiTelInput inputProps={{ readOnly: editing, label: "Phone Number" }} variant='filled' sx={{ width: '100%' }} defaultCountry="us" value={phone} onChange={handleChangePhone} />
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  <Autocomplete
                    sx={style}
                    id="tags-filled"
                    onChange={handleChangeMajor}
                    options={["",'Anthropology', 'Art History','Biology','Computer Science','Geology','History','Literature','Math']}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    readOnly={editing}
                    renderInput={(params) => (
                      <TextField
                        variant='filled'
                        label="Major"
                        {...params}
                      />
                  )}
        />
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  <FormControl variant='filled' sx={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-label">Mode Preference</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mode}
                      onChange={handleChangeMode}
                      inputProps={{ readOnly: editing }}
                    >
                      <MenuItem value={"Remote"}>Remote</MenuItem>
                      <MenuItem value={"In-person"}>In-person</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem>
            <ListItemText primary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  <FormControl variant='filled' sx={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-label">Profile Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={view}
                      onChange={handleChangeView}
                      inputProps={{ readOnly: editing }}
                    >
                      <MenuItem value={"Public View"}>Public View</MenuItem>
                      <MenuItem value={"Anonymous"}>Anonymous</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
        </List>
        <Autocomplete
          sx={style}
          multiple
          id="tags-outlined"
          onChange={handleChangeCourses}
          options={["",'CS211', 'CS212','CS213','CS392','CS348','CS349']}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          readOnly={editing}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='filled'
              label="Selected Courses"
            />
          )}
        />
      <Button size="small" variant="contained" onClick={signOut}>Sign Out</Button>
      </Stack>
      <Banner />
    </Container>
  );
};

export default Profile;
