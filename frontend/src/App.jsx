import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  HomePage,
  NavBar,
  NotFoundPage,
  SignIn,
  SignUp,
} from './includes/components';
import { BlogRoutes, UserRoutes } from './routes';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blogs/*" element={<BlogRoutes />} />
        <Route path="/users/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
