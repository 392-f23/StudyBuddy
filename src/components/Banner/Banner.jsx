import React from 'react';
import { useHistory } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';

const Banner = () => {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNavigation = (path) => {
    history.push(path);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => handleNavigation('/feed')}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<PersonIcon />}
        onClick={() => handleNavigation('/profile')}
      />
      <BottomNavigationAction
        label="My Posts"
        icon={<ListIcon />}
        onClick={() => handleNavigation('/myposts')}
      />
    </BottomNavigation>
  );
};

export default Banner;