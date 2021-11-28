// Dependency imports
import { Link, useNavigate } from 'react-router-dom';

// MUI imports (Material-UI)
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// import MenuIcon from "@mui/icons-material/Menu"; // for future

// Global State imports
import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

// Utility imports
import { updateUserPersistence } from '../utils/localStorage';
import { toast } from '../utils/toast';

// Custom styled MUI Appbar for app specific theme
const StyledAppBar = styled(AppBar)(() => ({
  justifyContent: 'center',
  minHeight: '6rem',
  padding: '1rem 0',
  backgroundColor: '#21507f !important',
  background: `linear-gradient( 135deg, #2e1f0deb 0%, #a64d4dbd 49%, #151006 100% );`,
}));

// Custom styled MUI Toolbar to center app title
const StyledToolbar = styled(Toolbar)(() => ({
  '> *': {
    minWidth: '8rem',
  },
}));

// Custom styled MUI Button to match theme
const StyledButton = styled(Button)(() => ({
  padding: '6px !important',
  borderRadius: '1rem !important',
  fontFamily: 'Georgia, serif !important',
  fontWeight: 'normal !important',
  textDecoration: 'none !important',
  fontStyle: 'normal',
  fontVariant: 'normal',
  boxShadow: 'rgb(0, 0, 0) 5px 5px 15px 5px',
  border: '2px solid rgb(28, 110, 164) !important',
  display: 'inline-block !important',
  '&:hover': {
    background: '#d3acda8f !important;',
  },
  '&:active': {
    background: 'rgb(21, 16, 6) !important',
  },
}));

const StyledClearButton = styled(StyledButton)(() => ({
  minWidth: '8rem',
  fontSize: '0.75rem',
}));

const StyledTypography = styled((props) => <Typography variant="h4" component="div" {...props} />)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '> *': {
    margin: '0.3rem !important',
  },
}));

export const Header = () => {
  // Snapshot of the global state
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();

  // An event handler to clear user from state, toast user, and remove user from ls
  // and redirect back to home
  const logout = () => {
    toast('Logging user out!', 800);
    setTimeout(() => {
      dispatch({ type: types.LOGOUT });
      updateUserPersistence();
      navigate('/');
    }, 800);
  };
  // An event handler that clears storage and reloads home to clear out pet data
  const clearStorage = () => {
    window.localStorage.removeItem('pets');
    window.localStorage.removeItem('user');
    window.location.replace('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          {/* placeholder */}
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>

          <StyledTypography>
            Jackson's Pet Store
            {/* Show login or logout based on authorization of user*/}
            {loggedIn ? (
              <StyledButton onClick={logout} color="inherit">
                Logout
              </StyledButton>
            ) : (
              <Link to="/login">
                <StyledButton color="inherit">Login</StyledButton>
              </Link>
            )}
          </StyledTypography>
          <StyledClearButton onClick={clearStorage} color="inherit">
            Clear Storage
          </StyledClearButton>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
};
