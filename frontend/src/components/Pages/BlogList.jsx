import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import ListView from '../common/ListView/ListView';
import { getBlogs } from '../../services';
import ErrorPage from './ErrorPage';

function BlogList() {
  console.log('Blog List Component');
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { data, isLoading, isError, error } = useQuery(
    ['all-blogs', page],
    () => getBlogs(page)
  );

  return (
    <Box component="nav" aria-label="blog list">
      {isLoading && <Spinner />}
      {data && <ListView items={data} />}
      {isError && <ErrorPage error={error} />}
    </Box>
  );
}

export default BlogList;
