import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonOutlined from './Outlined';
import AlertDialog from '../Dialog/AlertDialog';

export default function DeleteAlertButton({
  open,
  handleClickOpen,
  handleClose,
}) {
  const navigate = useNavigate();
  return (
    <Box display="flex">
      <ButtonOutlined onClick={() => navigate(`updatePassword`)}>
        Update Password
      </ButtonOutlined>
      <ButtonOutlined onClick={handleClickOpen}>Delete</ButtonOutlined>
      <AlertDialog
        title="Do you want to delete this blog!"
        description="Deleting your blog will remove the blog permanantly from our database. This cannot be undone."
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}
