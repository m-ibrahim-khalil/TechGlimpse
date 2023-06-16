import { MoreVertOutlined } from '@mui/icons-material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Avatar, CardHeader, CardMedia, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { deleteUserByUsername } from '../../../services/userService';
import dateTimeFormatter from '../../../utils/dateTimeFormatter';
import { ButtonOutlined, DeleteAlertButton } from '../Button';
import { logout } from '../../../features/authSlice';

export default function UserDetailsCard({ user }) {
  console.log('User Details Component');
  const [open, setOpen] = useState(false);
  const [showBlog, setShowBlog] = useState(true);
  const { id, avatar, username, email, createdAt } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { authUser: currentUser } = useSelector((state) => state.auth.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (ok = false) => {
    setOpen(false);
    if (ok) {
      await deleteUserByUsername(username);
      queryClient.invalidateQueries(['all-blogs']);
      dispatch(logout());
      return navigate(`/blogs`);
    }
    return null;
  };

  const handleShowBlogs = () => {
    if (showBlog) navigate(`blogs/${id}`);
    else navigate(-1);
    setShowBlog(!showBlog);
  };

  return (
    <Card className="userCard" key={id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="User">
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertOutlined />
          </IconButton>
        }
        title={
          <Typography
            variant="h6"
            component="div"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#863812',
            }}
          >
            {username}
          </Typography>
        }
        subheader={
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Member since:</b> {dateTimeFormatter(createdAt)}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="1024 px"
        image={avatar}
        alt="User Cover Photo"
        title="Cat"
      />
      <CardContent>
        <Grid container rowSpacing={0}>
          <Grid item xs={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EmailRoundedIcon
                sx={{ color: '#863812', width: 30, marginRight: '10px' }}
              />
              <span>{email}</span>
            </div>
          </Grid>
        </Grid>
        <CardActions>
          <ButtonOutlined onClick={handleShowBlogs}>
            {showBlog ? 'Show' : 'Hide'} Blogs
          </ButtonOutlined>
          {currentUser === username && (
            <DeleteAlertButton
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
            />
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}
