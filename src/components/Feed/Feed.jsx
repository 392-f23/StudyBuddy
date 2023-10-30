import { useState } from "react";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import Banner from "../Banner/Banner";
import { PostItem } from "../PostItem/PostItem";
import "./Feed.css";
import ContactModal from "../ContactModal/ContactModal";
import AvailabilityModal from "../AvailabilityModal/AvailabiltyModal";
import InfoDialog from "../Dialog/Dialog";
import Filters from "../Filters/Filters";

const Feed = ({ posts }) => {
  const [openContact, setOpenContact] = useState(false);

  const handleClickOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const [openAvailability, setOpenAvailability] = useState(false);

  const handleClickOpenAvailability = () => {
    setOpenAvailability(true);
  };

  const handleCloseAvailability = () => {
    setOpenAvailability(false);
  };

  const [contact, SetContact] = useState({});

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
        <AvailabilityModal contact={contact} />
      </InfoDialog>
      <Filters
        course={course}
        setCourse={setCourse}
        mode={mode}
        setMode={setMode}
      />
      <Container maxWidth="sm">
        <Stack spacing={2} className="feed-stack">
          {posts &&
            posts
              .filter((post) =>
                course !== "All" ? post.class === course : true
              )
              .filter((post) => displayCourseBasedOnMode(post.location))
              .map((item, index) => (
                <PostItem
                  key={index}
                  post={item}
                  handleOpenContact={handleClickOpenContact}
                  handleOpenAvailability={handleClickOpenAvailability}
                />
              ))}
        </Stack>
      </Container>
      <Banner />
    </Container>
  );
};

export default Feed;
