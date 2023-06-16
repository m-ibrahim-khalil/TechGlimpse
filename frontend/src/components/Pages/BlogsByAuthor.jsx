import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import { getBlogsByAuthor } from '../../services';
import ListView from '../common/ListView/ListView';
import ErrorPage from './ErrorPage';

export default function BlogsByAuthor() {
  console.log('Blog By Author Componenet');
  const { authorId } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { data, isLoading, isError, error } = useQuery(
    ['blogs-by-author', authorId],
    () => getBlogsByAuthor(authorId, page)
  );

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {isLoading && <Spinner />}
      {data && <ListView items={data} />}
      {isError && <ErrorPage error={error} />}
    </Box>
  );
}
