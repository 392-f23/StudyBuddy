import { useState } from "react";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import { PostItem } from "../PostItem/PostItem";
import "./Feed.css";
import ContactModal from "../ContactModal/ContactModal";
import AvailabilityModal from "../AvailabilityModal/AvailabiltyModal";
import InfoDialog from "../Dialog/Dialog";



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


  return (
    <Container maxWidth='sm'>
      <InfoDialog title={"Contact"} open={openContact} handleClose={handleCloseContact}>
        <ContactModal contact={contact} />
      </InfoDialog>
      <InfoDialog title={"Availability"} open={openAvailability} handleClose={handleCloseAvailability}>
        <AvailabilityModal contact={contact} />
      </InfoDialog>
      <Header />
      <Container maxWidth='sm'>
        <Stack spacing={2} className="feed-stack">
          {posts && posts.map((item, index) =>
            <PostItem key={index} post={item} handleOpenContact={handleClickOpenContact} handleOpenAvailability={handleClickOpenAvailability}/>
          )}
        </Stack>
      </Container>
      <Banner />
    </Container>
  );
};

export default Feed;
