import { useQuery } from '@tanstack/react-query';
import { Outlet, useParams } from 'react-router-dom';
import { getUserByUsername } from '../../services';
import { UserDetailsCard } from '../common/Cards';

export default function UserView() {
  console.log('User view Componenet');
  const { username } = useParams();

  const { data, isLoading, isError } = useQuery(['user', username], () =>
    getUserByUsername(username)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  const userCard = {
    avatar: '/images/cat.jpg',
    ...data.payload,
  };

  return (
    <>
      <UserDetailsCard user={userCard} />
      <Outlet />
    </>
  );
}
