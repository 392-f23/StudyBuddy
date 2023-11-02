import { Container, Paper, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./PostItem.css";

export const PostItem = ({
  post,
  handleOpenContact,
  handleOpenAvailability,
}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "left",
    padding: "1rem",
    color: theme.palette.text.secondary,
  }));

  return (
    <Item className="post-item">
      <h2 className="post-description">{post.title}</h2>
      <Chip className="post-course" size="small" label={post.course} />
      <p className="post-text">{post.description}</p>
      <p className="post-name">{post.user}</p>
      <p className="post-location">Location: {post.location}</p>
      <div className="button-flex">
        <Button variant="contained" onClick={handleOpenContact}>
          Contact
        </Button>
        <Button variant="contained" onClick={handleOpenAvailability}>
          Availability
        </Button>
      </div>
    </Item>
  );
};
