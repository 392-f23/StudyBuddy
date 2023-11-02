import Feed from "./components/Feed/Feed";
import Schedule from "./components/Schedule/Schedule";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { Container } from "@mui/material";
import { CreatePost } from "./components/CreatePost/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDbData } from "./utilities/firebase";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [posts, result] = useDbData("/courses");

  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Feed posts={posts} />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create_post" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default App;
