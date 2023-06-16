import { Routes, Route } from 'react-router-dom';
import {
  BlogList,
  BlogsLayout,
  CreateBlog,
  EditBlog,
  ErrorPage,
  NotFoundPage,
  SingleBlog,
  WithPrivateRoute,
} from '../includes/components';

export default function BlogRoutes() {
  return (
    <Routes>
      <Route element={<BlogsLayout />} errorElement={<ErrorPage />}>
        <Route index element={<BlogList />} />
        <Route path=":id" element={<SingleBlog />} />
        <Route
          path=":id/edit"
          element={
            <WithPrivateRoute>
              <EditBlog />
            </WithPrivateRoute>
          }
        />
        <Route
          path="new"
          element={
            <WithPrivateRoute>
              <CreateBlog />
            </WithPrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
