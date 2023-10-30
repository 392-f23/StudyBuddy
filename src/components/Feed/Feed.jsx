import { Container, Paper, Button, Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { styled } from '@mui/material/styles';
import './Feed.css'
import Banner from "../Banner/Banner";
import Header from "../Header/Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Feed = () => {
    return (
      <Container maxWidth='sm'>
        <Header />
        <Container maxWidth='sm'> 
          <Stack spacing={2}>
              <Item className='post-item'>
                  <h2 className='post-description'>HW2 Partner?</h2>
                  <Chip className='post-course' size="small" label="CS 338" />
                  <p className='post-text'>Stuck on HW2. HMU if u wanna work together!</p>
                  <p className='post-name'>Anonymous</p>
                  <p className='post-location'>Location: Remote</p>
                  <div className='button-flex'>
                      <Button variant="contained">Contact</Button>
                      <Button variant="contained">Availability</Button>
                  </div>
              </Item>
              <Item className='post-item'>
                  <h2 className='post-description'>Cypress Tutorial</h2>
                  <Chip className='post-course' size="small" label="CS 392" />
                  <p className='post-text'>Looking for people to work on Cypress Tutorial with, is anyone not done?</p>
                  <p className='post-name'>Anonymous</p>
                  <p className='post-location'>Location: Remote</p>
                  <div className='button-flex'>
                      <Button variant="contained">Contact</Button>
                      <Button variant="contained">Availability</Button>
                  </div>
              </Item>
              <Item className='post-item'>
                  <h2 className='post-description'>JS Exercises</h2>
                  <Chip className='post-course' size="small" label="CS 392" />
                  <p className='post-text'>Anyone doing the JavaScript exercises this week?</p>
                  <p className='post-name'>Anonymous</p>
                  <p className='post-location'>Location: Remote</p>
                  <div className='button-flex'>
                      <Button variant="contained">Contact</Button>
                      <Button variant="contained">Availability</Button>
                  </div>
              </Item>
          </Stack>
        </Container>
        <Banner />
      </Container>
    );
  };
  
export default Feed;
  