import Feed from "./components/Feed/Feed";
import Banner from "./components/Banner/Banner";
import Header from "./components/Header/Header";
import "./App.css";
import { Container} from "@mui/material";
import { CreatePost } from "./components/CreatePost/CreatePost";

const App = () => {
  return (
    <>
    <CreatePost/>
    </>
    // <Container maxWidth='sm'>
    //   <Header />
    //   <Feed />
    //   <Banner />
    // </Container>
  );
};

export default App;
