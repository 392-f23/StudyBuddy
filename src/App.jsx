import Feed from "./components/Feed/Feed";
import Schedule from "./components/Schedule/Schedule";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { Container} from "@mui/material";
import { CreatePost } from "./components/CreatePost/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDbData } from "./utilities/firebase";

const App = () => {

  const [courses, result] = useDbData("/courses")

  console.log(courses)
  
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
