import WithPrivateRoute from '../components/HOC/WithPrivateRoute';
import {
  ErrorPage,
  HomePage,
  NotFoundPage,
  Spinner,
  BlogList,
  BlogsByAuthor,
  CreateBlog,
  EditBlog,
  SignIn,
  SignUp,
  SingleBlog,
  UpdatePassword,
  UserView,
} from '../components/Pages';
import {
  ButtonOutlined,
  ButtonSubmit,
  DeleteAlertButton,
  WriteButton,
  ButtonLoading,
} from '../components/common/Button';
import {
  BlogDetailsCard,
  BlogListCard,
  UserDetailsCard,
} from '../components/common/Cards';
import {
  BlogForm,
  TextInputField,
  PasswordInputField,
} from '../components/common/Form';
import { BlogsLayout, UsersLayout, NavBar } from '../components/layouts';

export {
  // buttons
  ButtonOutlined,
  ButtonSubmit,
  DeleteAlertButton,
  WriteButton,
  ButtonLoading,
  // Card
  BlogDetailsCard,
  BlogListCard,
  UserDetailsCard,
  // HOC
  WithPrivateRoute,
  // Form Components
  BlogForm,
  TextInputField,
  PasswordInputField,
  // Layouts
  BlogsLayout,
  UsersLayout,
  NavBar,
  // Pages
  ErrorPage,
  HomePage,
  NotFoundPage,
  Spinner,
  BlogList,
  BlogsByAuthor,
  CreateBlog,
  EditBlog,
  SignIn,
  SignUp,
  SingleBlog,
  UpdatePassword,
  UserView,
};
