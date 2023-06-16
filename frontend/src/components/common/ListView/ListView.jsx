import { Divider, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BlogListCard } from '../Cards';

function ListView({ items }) {
  console.log('Listview Componenet');
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
  const navigate = useNavigate();
  const { payload: blogs, totalPages } = items;

  const handleChange = (event, value) => {
    setPage(value);
    navigate(`/blogs/?page=${value}`);
  };

  return (
    <>
      <Typography
        variant="h6"
        align="center"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          color: '#863812',
        }}
      >
        {blogs.length ? 'Blog List' : 'No Blog Found'}
      </Typography>
      {blogs.length && (
        <>
          <Divider />
          <div>
            {blogs.map((blog) => (
              <BlogListCard key={blog.id} blog={blog} />
            ))}
          </div>
          <Divider />
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </>
      )}
    </>
  );
}

export default ListView;
