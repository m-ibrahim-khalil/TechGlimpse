import { TextField } from '@mui/material';
import React from 'react';

function TextInputField({ label, error, ...rest }) {
  const mark = label.trim().split(' ').join('').toLocaleLowerCase();
  return (
    <TextField
      variant="outlined"
      required
      type="text"
      fullWidth
      id={mark}
      label={label}
      name={mark}
      error={!!error}
      helperText={error}
      {...rest}
    />
  );
}

export default TextInputField;
