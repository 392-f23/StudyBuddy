import Banner from "../Banner/Banner";
import "./Profile.css";
import { Container } from "@mui/material";

const Profile = () => {
  return (
    <Container maxWidth="sm">
      <div className="main">Profile Page</div>
      <Banner />
    </Container>
  );
};

export default Profile;
