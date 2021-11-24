import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// import MenuIcon from "@mui/icons-material/Menu"; // for future

import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

import { updateUserPersistence } from '../utils/localStorage';

const StyledAppBar = styled(AppBar)(() => ({
  justifyContent: 'center',
  minHeight: '6rem',
  backgroundColor: '#21507f !important',
  background: `linear-gradient( 135deg, #2e1f0deb 0%, #643131bd 49%, #151006 100% );`,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  '> *': {
    minWidth: '4.5rem',
  },
}));

export const Header = () => {
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: types.LOGOUT });
    updateUserPersistence();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          {/* future dev */}
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton> */}
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Jackson's Pet Store
          </Typography>
          {loggedIn ? (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
};
