import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../services';
import { BlogForm } from '../common/Form';
import { logout } from '../../features/authSlice';

export default function CreateBlog() {
  console.log('Create Blog Componenet');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      console.log('success create blog mutation:', data.payload.id);
      queryClient.setQueryData(['create-blog'], data);
      queryClient.invalidateQueries(['create-blog'], { exact: true });
      queryClient.invalidateQueries(['all-blogs']);
      queryClient.invalidateQueries([
        'blogs-by-author',
        data?.payload?.authorId,
      ]);
      navigate(`/blogs/`);
    },
    onError: (err) => {
      console.log('On Error', err);
      if (err.response.data.message === 'jwt expired') {
        dispatch(logout());
        navigate('/');
      }
    },
  });
  return <BlogForm option="Create" mutation={createBlogMutation} />;
}
