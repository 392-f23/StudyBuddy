import { Container, Paper, Button, Chip, Avatar } from "@mui/material";
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

  const calculateTimeAgo = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    if (seconds === 0) {
      return "NOW";
    }

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " YRS AGO";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
  };

  return (
    <Item className="post-item">
      <div className="post-header">
        <h2 className="post-description">{post.title}</h2>
        <div className="post-user">
            <Avatar sx={{ width: 30, height: 30, marginBottom: '.5rem'}} src={post.userImage ? post.userImage : ''}></Avatar>
            <div style={{marginLeft: "10px", marginRight: "10px"}}>
              {post.userName ? post.userName : 'Anonymous'}
            </div>
            {calculateTimeAgo(post.time)}
        </div>
      </div>
      <Chip className="post-course" size="small" label={post.course} />
      <p className="post-text">{post.description}</p>
      <p className="post-name">{post.user}</p>
      <p className="post-location">
        <b>Location</b>: {post.location}
      </p>
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
