import React ,{useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInLogo from '../Assets/logo.png';
import { Link } from 'react-router-dom'; 
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


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

  const [personAnchorEl, setPersonAnchorEl] = React.useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [recemail, setRecEmail] = useState(localStorage.getItem("recemail"));
  const handlePersonClick = (event) => {
    setPersonAnchorEl(event.currentTarget);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setPersonAnchorEl(null);
    setMoreAnchorEl(null);
  };

 
  const logout = () => {
    const token = localStorage.getItem("email");
    const rectoken = localStorage.getItem("recemail");
  
    if (token !== null || rectoken !== null) {
      // Clear the tokens from local storage
      localStorage.clear();
    }
  
    // Redirect the user to the '/' route
    window.location = "/";
  }
  
  const handleHomeIconClick = () => {
       if (email) {
       
      window.location = "/dashboard";
    } else if(recemail) {
      // User is not logged in, navigate to the home page
      
      window.location = "/";
    }else{
      window.location = "/";
    }
  }

  return (
    <HeaderAppBar position="static">
      <Toolbar>
        
        <HeaderLogo src={LinkedInLogo} alt="LinkedIn Logo" />
        
        <HeaderIconsContainer>
          {/* <IconButton color="inherit" component={Link} to="/">
            <HomeIcon />
          </IconButton> */}
          <IconButton color="inherit" onClick={handleHomeIconClick}>
            <HomeIcon />
          </IconButton>
          {/* Person Icon with Dropdown */}
          <IconButton color="inherit" onClick={handlePersonClick}>
            <PersonIcon />
          </IconButton>
          <Popover
            open={Boolean(personAnchorEl)}
            anchorEl={personAnchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List>
              <ListItem button onClick={logout}>
                <ListItemText primary="Logout" />
                
              </ListItem>
              {/* Add more items as needed */}
            </List>
          </Popover>

          {/* More Icon with Dropdown */}
          <IconButton color="inherit" onClick={handleMoreClick}>
            <MoreHorizIcon />
          </IconButton>
          <Popover
            open={Boolean(moreAnchorEl)}
            anchorEl={moreAnchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List>
              <ListItem button onClick={handleClose}component={Link} to="/jobList">
                <ListItemText primary="Option 1" />
              </ListItem>
              {/* Add more items as needed */}
            </List>
          </Popover>
          

        </HeaderIconsContainer>
      </Toolbar>
    </HeaderAppBar>
  );
};

export default Headermain;