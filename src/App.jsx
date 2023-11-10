import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import "./App.css";
import { Container } from "@mui/material";
import { PostForm } from "./components/PostForm/PostForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDbData } from "./utilities/firebase";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Signin } from "./components/Signin/Signin";
import { SignUp } from "./components/SignUp/SignUp";
import MyPosts from "./components/MyPosts/MyPosts";

const App = () => {
  const [posts, result] = useDbData("/posts");
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/feed" element={<Feed posts={posts} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myposts" element={<MyPosts posts={posts} />} />
            <Route path="/create_post" element={<PostForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
};

export default App;
