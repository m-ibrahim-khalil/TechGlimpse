import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavMenu from '../common/Menu/NavMenu';
import Logo from './Logo';
import { WriteButton } from '../common/Button';

function NavBar() {
  const { authUser } = useSelector((state) => state.auth.value);
  console.log('Navbar Loading: ', authUser);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PsychologyIcon
            sx={{
              fontSize: '32px',
              display: { xs: 'none', md: 'flex' },
              mr: 1,
            }}
          />
          <Logo isMobile={false} />
          <NavMenu
            items={[`Hi ${authUser || 'Guest'}`, 'Blogs', 'write']}
            icon={<MenuIcon />}
          />
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/blogs"
              sx={{
                color: 'inherit',
                display: 'block',
                fontFamily: 'monospace',
              }}
            >
              Recent Blogs
            </Button>
          </Box>

          {authUser && (
            <Box sx={{ display: { xs: 'none', md: 'blocked' } }}>
              <WriteButton />
              <Typography
                component={Link}
                to={`/users/${authUser}`}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                  marginRight: 1,
                }}
              >
                Hi {authUser?.toUpperCase()}
              </Typography>
            </Box>
          )}

          <NavMenu
            items={authUser ? ['My Profile', 'Logout'] : ['Signin', 'Signup']}
            icon={
              authUser ? (
                <AccountCircle sx={{ fontSize: '36px' }} />
              ) : (
                <NoAccountsIcon sx={{ fontSize: '36px' }} />
              )
            }
            responsive={false}
            authUser={authUser}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
