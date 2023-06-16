import { Button } from '@mui/material';

function ButtonSubmit({ children, ...rest }) {
  return (
    <Button
      type="submit"
      fullWidth
      color="primary"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default ButtonSubmit;
