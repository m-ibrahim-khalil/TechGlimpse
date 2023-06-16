import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function UsersLayout() {
  return (
    <Box
      sx={{
        padding: '3rem',
        margin: '2rem',
        background: '#f1f1f1',
      }}
    >
      <Outlet />
    </Box>
  );
}

export default UsersLayout;
