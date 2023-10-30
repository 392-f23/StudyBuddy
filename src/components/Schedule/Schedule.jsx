import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import './Schedule.css'
import { Container} from "@mui/material";

const Schedule = () => {
    return (
      <Container maxWidth='sm'>
        <Header />
        <div>
          Schedule
        </div>
        <Banner />
      </Container>
    );
  };
  
  export default Schedule;