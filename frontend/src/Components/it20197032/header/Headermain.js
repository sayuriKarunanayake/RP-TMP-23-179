import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInLogo from '../../../Assets/logo.png';
import { Link } from 'react-router-dom'; 


const HeaderAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1976d2',
}));

const HeaderLogo = styled('img')(({ theme }) => ({
  marginRight: theme.spacing(2),
  height: 32,
}));

const HeaderSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '25%',
}));

const HeaderSearchIcon = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color:'grey',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HeaderInputRoot = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
 
}));

const HeaderInputInput = styled('input')(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));

const HeaderIconsContainer = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
}));

const Headermain = () => {
  return (
    <HeaderAppBar position="static">
      <Toolbar>
        
        <HeaderLogo src={LinkedInLogo} alt="LinkedIn Logo" />
        <HeaderSearch>
          <HeaderSearchIcon>
            <SearchIcon />
          </HeaderSearchIcon>
          <HeaderInputRoot
            placeholder="                 Search..."
            inputProps={{ 'aria-label': 'search' }}
            inputComponent={HeaderInputInput}
          />
        </HeaderSearch>
        <HeaderIconsContainer>

          <IconButton color="inherit" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/joblist">
            <WorkIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreHorizIcon />
          </IconButton>
          

        </HeaderIconsContainer>
      </Toolbar>
    </HeaderAppBar>
  );
};

export default Headermain;