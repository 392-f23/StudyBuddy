import Feed from "./components/Feed/Feed";
import Schedule from "./components/Schedule/Schedule";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { Container } from "@mui/material";
import { CreatePost } from "./components/CreatePost/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDbData } from "./utilities/firebase";
import Header from "./components/Header/Header";

const App = () => {
  const [posts, result] = useDbData("/courses");

  return (
    <Container maxWidth="sm">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed posts={posts} />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
