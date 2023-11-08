import { useState } from "react";
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
import { useDbData } from "../../utilities/firebase";

const Feed = ({ posts }) => {
  const navigate = useNavigate();
  const [userData, error] = useDbData("/users");

  const [contact, SetContact] = useState({});
  const [availability, SetAvailability] = useState("");
  const [openContact, setOpenContact] = useState(false);

  const handleClickOpenContact = post_item => {
    console.log(post_item, userData[post_item.user_id])
    const contact_email = userData[post_item.user_id].email;
    const contact_phone = userData[post_item.user_id].phoneNumber;
    SetContact({"email": contact_email, "phone_number": contact_phone})
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const [openAvailability, setOpenAvailability] = useState(false);

  const handleClickOpenAvailability = post_item => {
    const contact_availability = userData[post_item.user_id].availability;
    SetAvailability(contact_availability);
    setOpenAvailability(true);
  };

  const handleCloseAvailability = () => {
    setOpenAvailability(false);
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
      <Filters
        course={course}
        setCourse={setCourse}
        mode={mode}
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
              .filter((post) =>
                course !== "All" ? post.course === course : true
              )
              .filter((post) => displayCourseBasedOnMode(post.location))
              .map((item, index) => (
                <PostItem
                  key={index}
                  post={item}
                  handleOpenContact={() => handleClickOpenContact(item)}
                  handleOpenAvailability={() => handleClickOpenAvailability(item)}
                />
              ))}
        </Stack>
      </Container>
      <Banner />
    </Container>
  );
};

export default Feed;
