import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { Stack } from "@mui/system";
import Banner from "../Banner/Banner";
import { PostItem } from "../PostItem/PostItem";
import "./Feed.css";
import ContactModal from "../ContactModal/ContactModal";
import AvailabilityModal from "../AvailabilityModal/AvailabiltyModal";
import InfoDialog from "../Dialog/Dialog";
import Filters from "../Filters/Filters";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDbData, useAuth } from "../../utilities/firebase";
import ProfileModal from "../ProfileModal/ProfileModal";

const Feed = ({ posts }) => {
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

  const [contact, SetContact] = useState({});
  const [availability, SetAvailability] = useState("");
  const [profile, setProfile] = useState("");
  const [openContact, setOpenContact] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleClickOpenContact = (post_item) => {
    const contact_email = userData[post_item.user_id].email;
    const contact_phone = userData[post_item.user_id].phoneNumber;
    SetContact({ email: contact_email, phone_number: contact_phone });
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const handleClickOpenAvailability = (post_item) => {
    let availabilityArr = post_item.availability;
    if (availabilityArr) {
      availabilityArr = availabilityArr.map(
        (x) => `${x.date} ${x.start_time} - ${x.end_time}`
      );
    }
    SetAvailability(availabilityArr || ["Not Provided"]);
    setOpenAvailability(true);
  };

  const handleCloseAvailability = () => {
    setOpenAvailability(false);
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
        title={"Contact"}
        open={openContact}
        handleClose={handleCloseContact}
      >
        <ContactModal contact={contact} />
      </InfoDialog>
      <InfoDialog
        title={"Availability"}
        open={openAvailability}
        handleClose={handleCloseAvailability}
      >
        <AvailabilityModal availability={availability} />
      </InfoDialog>
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
              .map((item, index) => (
                <PostItem
                  key={index}
                  post={item}
                  handleOpenContact={() => handleClickOpenContact(item)}
                  handleOpenAvailability={() =>
                    handleClickOpenAvailability(item)
                  }
                  handleOpenProfile={() => handleClickOpenProfile(item)}
                />
              ))}
        </Stack>
      </Container>
      <Banner />
    </Container>
  );
};

export default Feed;
