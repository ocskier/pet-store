import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
// import MenuIcon from "@mui/icons-material/Menu"; // for future

const StyledAppBar = styled(AppBar)(() => ({
  justifyContent: 'center',
  minHeight: '6rem',
  background: `linear-gradient(135deg,#2e1f0deb 0%,#643131bd 49%,#151006 100%)`,
}));

export const Header = () => {
  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar className="toolbar">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Jackson's Pet Store
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};
