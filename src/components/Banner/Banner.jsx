import * as React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction} from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Banner = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon/>} />
        <BottomNavigationAction label="Schedule" icon={<CalendarMonthIcon />}/>
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />}/>
      </BottomNavigation>
    </Paper>
  );
}

export default Banner;