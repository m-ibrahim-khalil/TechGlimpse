import { Button } from '@mui/material';
import React from 'react';

function ButtonOutlined({ children, background, opacity, ...rest }) {
  return (
    <Button
      size="small"
      type="submit"
      variant="outlined"
      {...rest}
      style={{
        backgroundColor: background || '#863812',
        color: '#EBE4D2',
        opacity: opacity || 1,
        marginLeft: '4.5rem',
        padding: '0.6rem 1.5rem',
        borderRadius: '5px',
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonOutlined;
