import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Home;
