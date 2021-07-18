import NavBar from "./Navigation";

const Home = () => {
  let links = [
    ["Home", "/", 0],
    ["Sign up", "/signup", 1],
    ["Log in", "/login", 2],
  ];

  return (
    <div className="hundred-per-cent-container">
      <NavBar links={links}></NavBar>
      <div className="title-container">
        <h1 className="white-font big-font kalam-font bold-font">
          Welcome to Recipes
        </h1>
      </div>
    </div>
  );
};

export default Home;
