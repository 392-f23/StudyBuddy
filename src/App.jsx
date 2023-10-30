import Feed from "./components/Feed/Feed";
import Schedule from "./components/Schedule/Schedule";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { Container} from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Container maxWidth='sm'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />}/>
        <Route path='/schedule' element={<Schedule />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
