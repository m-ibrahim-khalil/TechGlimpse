import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BlogDetailsCard } from '../common/Cards';
import { getBlogById } from '../../services';
import Spinner from './Spinner';
import ErrorPage from './ErrorPage';

export default function SingleBlog() {
  console.log('SingleBlog Componenet');
  const { id } = useParams();
  const blogPost = {
    avatar: '/images/cats.jpg',
    favorite: true,
  };
  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery(['single-blog', id], () => getBlogById(id));

  return (
    <>
      {isLoading && <Spinner />}
      {blog && <BlogDetailsCard blog={{ ...blogPost, ...blog }} />}
      {isError && <ErrorPage error={error} />}
    </>
  );
}
