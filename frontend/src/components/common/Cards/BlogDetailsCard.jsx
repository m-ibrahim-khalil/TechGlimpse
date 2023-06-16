import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { deleteBlog } from '../../../services/blogService';
import dateTimeFormatter from '../../../utils/dateTimeFormatter';
import { ButtonOutlined } from '../Button';
import AlertDialog from '../Dialog/AlertDialog';

export default function BlogDetailsCard({ blog }) {
  const [open, setOpen] = useState(false);
  const { authUser: currentUser } = useSelector((state) => state.auth.value);
  const { title, description, author, updatedAt, avatar } = blog;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (ok = false) => {
    setOpen(false);
    if (ok) {
      await deleteBlog(blog.id);
      queryClient.invalidateQueries(['all-blogs']);
      queryClient.invalidateQueries(['single-blog', blog.id]);
      return navigate('/blogs');
    }
    return null;
  };

  const cardHeader = (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
          B
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
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
          {title}
        </Typography>
      }
      subheader={
        <>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Last Modified:</b> {dateTimeFormatter(updatedAt)}
          </Typography>
          <Typography
            onClick={() => navigate(`/users/${author}`)}
            sx={{ mb: 1.5 }}
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#863812',
            }}
          >
            Author: @{author}
          </Typography>
        </>
      }
    />
  );

  const editDeleteBtnGroup = (
    <Box display="flex">
      <ButtonOutlined onClick={() => navigate(`/blogs/${blog.id}/edit`)}>
        Edit
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

  return (
    <div style={{ padding: '3rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '5rem',
        }}
      >
        <Typography
          onClick={() => navigate(-1)}
          style={{
            fontSize: '16px',
            color: '#863812',
            textDecoration: 'none',
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
        >
          ← Go Back
        </Typography>
        <Typography
          onClick={() => navigate('/blogs')}
          style={{
            fontSize: '16px',
            color: '#863812',
            textDecoration: 'none',
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
        >
          Show All Blogs
        </Typography>
      </div>

      <Card className="blogCard">
        {cardHeader}
        <CardMedia
          component="img"
          height="512 px"
          image={avatar}
          alt="Blog Cover Photo"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: 'justify' }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {currentUser === author && editDeleteBtnGroup}
        </CardActions>
      </Card>
    </div>
  );
}
