import { Button } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { Link } from 'react-router-dom';

function WriteButton() {
  return (
    <Button
      component={Link}
      to="/blogs/new"
      variant="text"
      color="inherit"
      sx={{ mt: 3, mb: 2, fontFamily: 'monospace', margin: (1, 0, 1) }}
    >
      <SaveAsOutlinedIcon sx={{ marginRight: 1 }} /> Write
    </Button>
  );
}

export default WriteButton;
