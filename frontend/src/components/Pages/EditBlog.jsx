import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getBlogById, updateBlog } from '../../services';
import { getAuthUsername } from '../../utils/jwt';
import { BlogForm } from '../common/Form';
import { logout } from '../../features/authSlice';
import Spinner from './Spinner';
import ErrorPage from './ErrorPage';

export default function EditBlog() {
  console.log('Edit Blog Componenet');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery(['single-blog', id], () => getBlogById(id));
  const authenticateUser = getAuthUsername();
  const queryClient = useQueryClient();
  const updateBlogMutation = useMutation({
    mutationFn: (data) => updateBlog(id, data),
    onSuccess: (data) => {
      console.log('success update blog mutation:', data);
      queryClient.setQueryData(['update-blog', id], data);
      queryClient.invalidateQueries(['update-blog'], { exact: true });
      queryClient.invalidateQueries(['single-blog', id], { exact: true });
      navigate(`/blogs/${id}`);
    },
    onError: (err) => {
      console.log('On Error', err);
      if (err.response.data.message === 'jwt expired') {
        dispatch(logout());
        navigate('/');
      }
    },
  });

  if (authenticateUser !== blog?.author) {
    return <p>You have no access to edit the blog</p>;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {blog && (
        <BlogForm blog={blog} option="Edit" mutation={updateBlogMutation} />
      )}
      {isError && <ErrorPage error={error} />}
    </>
  );
}
