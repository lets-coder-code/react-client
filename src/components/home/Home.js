import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <Link to="/login" className="link">Log in</Link>
      <Link to="/signup" className="link">Sign up</Link>
    </div>
  )
}

export default Home;
