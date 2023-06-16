import { Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import dateTimeFormatter from '../../../utils/dateTimeFormatter';

function BlogListCard({ blog, length = 100 }) {
  const navigate = useNavigate();
  return (
    <Card className="blogCards" key={blog.id} style={{ marginBottom: '2rem' }}>
      <CardContent onClick={() => navigate(`/blogs/${blog.id}`)}>
        <Typography
          variant="h5"
          component="div"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            color: '#863812',
          }}
        >
          {blog.title}
        </Typography>
        <Typography
          className="blogAuthor"
          sx={{
            fontSize: 13,
            fontFamily: 'Poppins',
            padding: '0',
            display: 'inline-block',
            alignItems: 'center',
          }}
          color="#863812"
        >
          &nbsp;@{blog.author}
        </Typography>
        <br />
        {dateTimeFormatter(blog.updatedAt)}
        <Divider />
        <div style={{ textAlign: 'justify' }}>
          <span style={{ whiteSpace: 'pre-line' }}>
            {blog.description.length > length
              ? `${blog.description.slice(0, length)} ......`
              : blog.description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogListCard;
