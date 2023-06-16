import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logo({ isMobile = true }) {
  return (
    <Typography
      variant={isMobile ? 'h6' : 'h5'}
      noWrap
      component={Link}
      to="/"
      sx={{
        mr: 2,
        display: {
          xs: isMobile ? 'flex' : 'none',
          md: isMobile ? 'none' : 'flex',
        },
        fontFamily: 'monospace',
        fontWeight: isMobile ? 600 : 700,
        letterSpacing: isMobile ? '0.05rem' : '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      TechGlimpse
    </Typography>
  );
}
