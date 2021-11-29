// Dependency imports
import { Link, useLocation, useNavigate } from 'react-router-dom';

// MUI imports (Material-UI)
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Home, Pets } from '@mui/icons-material';
// import MenuIcon from "@mui/icons-material/Menu"; // for future

// Global State imports
import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

// Utility imports
import { logoutUser } from '../utils/api';
import { updateUserPersistence } from '../utils/localStorage';
import { toast } from '../utils/toast';

// Custom styled MUI Appbar for app specific theme
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  justifyContent: 'center',
  minHeight: '6rem',
  padding: '1rem 0 1rem 0',
  backgroundColor: '#21507f !important',
  background: `linear-gradient( 135deg, #2e1f0deb 0%, #a64d4dbd 49%, #151006 100% );`,
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0.5rem',
  },
}));

// Custom styled MUI Toolbar to center app title
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '> *': {
    minWidth: '8rem',
  },
  '> a:first-of-type': {
    maxWidth: '8rem;',
    marginTop: '0.3rem;',
  },
  '> a:first-of-type svg': {
    paddingBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '> a:first-of-type': {
      order: 2,
      marginTop: '0.5rem',
    },
  },
}));

// Custom styled MUI Button to match theme
const StyledButton = styled(Button)(() => ({
  padding: '6px !important',
  margin: '0.25rem 0',
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

// Custom Clear Button to match theme
const StyledClearButton = styled(StyledButton)(() => ({
  minWidth: '8rem',
  fontSize: '0.75rem',
}));

// Custom text container for brand with flex
const StyledTypography = styled((props) => <Typography variant="h4" component="div" {...props} />)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '> *': {
    margin: '0.3rem !important',
  },
}));

// Custom username text when logged in
const StyledLinkTypography = styled(StyledTypography)(({ theme }) => ({
  maxWidth: '8rem',
  marginTop: '0.3rem',
  [theme.breakpoints.down('sm')]: {
    order: 2,
    marginTop: '0.5rem',
  },
}));

// Custom Home link icon
const StyledHome = styled(Home)(() => ({
  paddingBottom: '0.5rem',
  '&:hover > *': { fill: '#d3acda8f !important;' },
}));

// Custom Paw link icon
const StyledPets = styled(Pets)(() => ({
  paddingBottom: '0.5rem',
  '&:hover > *': { fill: '#d3acda8f !important;' },
}));

export const Header = () => {
  // Snapshot of the global state
  const {
    state: { loggedIn, user },
    dispatch,
  } = useGlobalContext();

  // Destructuring username value from user if exists
  // else set to null (for ts)
  const { username } = user || { username: null };

  // Hook to access route path
  const location = useLocation();

  // Redirect hook
  const navigate = useNavigate();

  // An event handler to clear user from state, toast user, and remove user from ls
  // and redirect back to home
  const logout = async () => {
    try {
      const res = await logoutUser();
      const data = await res.json();
      if (data.code < 400) {
        toast('Logging user out!', 800);
        setTimeout(() => {
          dispatch({ type: types.LOGOUT });
          updateUserPersistence();
          navigate('/');
        }, 800);
      } else {
        toast(`Trouble logging you out!`, 1400, 'error');
      }
    } catch (err) {
      toast(`Something went wrong!`, 1400, 'error');
    }
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
          {/* If logged in show username else icon to Dashboard */}
          {loggedIn && username ? (
            <StyledLinkTypography>{username[0].toUpperCase() + username.slice(1)}</StyledLinkTypography>
          ) : (
            <Link to={location.pathname !== '/login' ? '/dashboard' : '/'}>
              {location.pathname !== '/login' ? <StyledPets fontSize="large" /> : <StyledHome fontSize="large" />}
            </Link>
          )}
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
