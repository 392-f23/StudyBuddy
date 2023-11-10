import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import Banner from "../Banner/Banner";
import { PostItem } from "../PostItem/PostItem";
import "./MyPosts.css";
import ContactModal from "../ContactModal/ContactModal";
import AvailabilityModal from "../AvailabilityModal/AvailabiltyModal";
import InfoDialog from "../Dialog/Dialog";
import Filters from "../Filters/Filters";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDbData, useAuth } from "../../utilities/firebase";
import ProfileModal from "../ProfileModal/ProfileModal";

const MyPosts = ({ posts }) => {
  const navigate = useNavigate();
  const [userData, error] = useDbData("/users");
  const [user] = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (typeof userData !== "undefined") {
      const userInfo = userData[user.uid];
      const coursesString = userInfo.courses;
      setCourses(coursesString);
    }
  }, [userData]);

  const [profile, setProfile] = useState("");
  const [openProfile, setOpenProfile] = useState(false);

  const handleClickOpenEdit = (post_item) => {
    alert("Editing");
  };

  const handleClickOpenDelete = (post_item) => {
    alert("Deleting");
  };

  const handleClickOpenProfile = (post_item) => {
    const poster = userData[post_item.user_id];
    const year = poster.year;
    const major = poster.major;
    const mode = poster.mode;
    setProfile({ year: year, major: major, mode: mode });
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const [course, setCourse] = useState("All");
  const [mode, setMode] = useState("Both");

  const displayCourseBasedOnMode = (location) => {
    if (mode === "Both") {
      return true;
    }

    if (mode === "Remote") {
      return location === "Remote";
    }

    if (mode === "In-Person") {
      return location !== "Remote";
    }
  };

  return (
    <Container maxWidth="sm" className="home-container">
      <InfoDialog
        title={"Profile"}
        open={openProfile}
        handleClose={handleCloseProfile}
      >
        <ProfileModal profile={profile} />
      </InfoDialog>
      <Filters
        courses={courses}
        setCourses={setCourses}
        setCourse={setCourse}
        setMode={setMode}
      />

      <div className="post-button">
        <Button startIcon={<Add />} onClick={() => navigate("/create_post")}>
          Add Post
        </Button>
      </div>

      <Container maxWidth="sm">
        <Stack spacing={2} className="feed-stack">
          {posts &&
            Object.values(posts)
              .sort((postOne, postTwo) => postTwo.time - postOne.time)
              .filter((post) => courses.includes(post.course))
              .filter((post) =>
                course !== "All" ? post.course === course : true
              )
              .filter((post) => displayCourseBasedOnMode(post.location))
              .filter((post) => post.user_id === user.uid)
              .map((item, index) => (
                <PostItem
                  key={index}
                  post={item}
                  handleOpenLeftBtn={() => handleClickOpenEdit(item)}
                  handleOpenRightBtn={() => handleClickOpenDelete(item)}
                  handleOpenProfile={() => handleClickOpenProfile(item)}
                  modifying={true}
                />
              ))}
        </Stack>
      </Container>
      <Banner />
    </Container>
  );
};

export default MyPosts;
