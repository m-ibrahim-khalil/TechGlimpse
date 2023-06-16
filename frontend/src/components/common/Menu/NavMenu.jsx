import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { WriteButton } from '../Button';
import { logout } from '../../../features/authSlice';

function NavMenu({ items, icon, responsive = true, authUser }) {
  console.log('NavMenu Load');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const sx = responsive
    ? { flexGrow: 1, display: { xs: 'flex', md: 'none' } }
    : { flexGrow: 0 };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={sx}>
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        color="inherit"
      >
        {icon}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{
          display: { xs: 'block' },
        }}
      >
        {items.map((item) => {
          if (item === 'Logout')
            return (
              <MenuItem key={item} onClick={handleLogout}>
                <Typography textAlign="center">{item}</Typography>
              </MenuItem>
            );
          if (item === 'write')
            return (
              <MenuItem key={item} onClick={handleCloseMenu}>
                <WriteButton />
              </MenuItem>
            );
          if (item.includes('Hi'))
            return (
              <MenuItem key={item} onClick={handleCloseMenu}>
                <Typography textAlign="center">{item}</Typography>
              </MenuItem>
            );
          return (
            <MenuItem
              key={item}
              component={Link}
              to={item === 'My Profile' ? `/users/${authUser}` : `/${item}`}
              onClick={handleCloseMenu}
            >
              <Typography textAlign="center">{item}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}

export default NavMenu;
