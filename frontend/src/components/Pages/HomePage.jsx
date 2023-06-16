import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  console.log('Home Page');
  return (
    <div className="HomePage">
      <h3>Blogger App</h3>
      <h6>Share Your Stories and Ideas on Our Blog</h6>
      <Link to="/blogs" className="learnMore">
        START BLOGGING
      </Link>
    </div>
  );
}
export default HomePage;
