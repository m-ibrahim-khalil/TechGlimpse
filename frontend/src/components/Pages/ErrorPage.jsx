import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';

export default function ErrorPage({ error }) {
  console.log('Error Page');
  const dispatch = useDispatch();
  if (error?.message.includes('jwt expired')) {
    dispatch(logout());
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error?.statusText ||
            error?.message ||
            error?.name ||
            error?.response}
        </i>
      </p>
    </div>
  );
}
