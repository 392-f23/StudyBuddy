import Banner from "../Banner/Banner";
import "./Profile.css";
import { Typography, Stack, Container, Avatar, List, ListItem, ListItemText, Autocomplete, TextField, Button } from "@mui/material";
import * as React from 'react';
import { FirebaseSignOut } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const style = {
    width: '100%',
    maxWidth: '20rem',
    bgcolor: 'background.paper',
    borderRadius: '4px',
    marginBottom: '1rem',
    marginTop: '1rem'
  };

  const style2 = {
    width: '100%',
    maxWidth: '20rem',
    bgcolor: 'background.paper',
    borderRadius: '4px',
    marginBottom: '1rem',
    marginTop: '0rem'
  };

  const signOut = () => {
    FirebaseSignOut();
    navigate('/')
  }

  return (
    <Container maxWidth="sm">
      <Stack className="main">
        <Avatar sx={{ width: 40, height: 40, marginBottom: '.5rem'}}></Avatar>
        <h3>First Last</h3>
        <List sx={style}>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                {"School Year - "}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  Senior
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                {"Phone Number - "}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  (123)-456-7890
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                {"Major Subject - "}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  Computer Science
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={
              <React.Fragment>
                {"Mode Preference - "}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  Remote
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
          <ListItem>
            <ListItemText primary={
              <React.Fragment>
                {"Profile Type - "}
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                >
                  Anonymous
                </Typography>
              </React.Fragment>
            }/>
          </ListItem>
        </List>
        <Autocomplete
          sx={style2}
          multiple
          id="tags-outlined"
          options={['CS211', 'CS212']}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="courses"
              placeholder="Add Course"
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
