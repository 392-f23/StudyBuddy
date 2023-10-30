import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import './Profile.css'
import { Container} from "@mui/material";

const Profile = () => {
    return (
      <Container maxWidth='sm'>
        <Header />
        <div>
          Profile
        </div>
        <Banner />
      </Container>
    );
  };
  
  export default Profile;