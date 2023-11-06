import * as React from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Banner = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/feed"
        />
        <BottomNavigationAction
          label="Schedule"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/schedule"
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Banner;
