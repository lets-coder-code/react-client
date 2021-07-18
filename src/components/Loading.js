import NavBar from "./Navigation";

const Loading = () => {
  let links = [
    ["Log out", "/logout", 0],
    ["My home", "/session", 1],
    ["Following", "/", 2],
    ["Favourites", "/", 3],
  ];
  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <span className="medium-font">Loading...</span>
    </div>
  );
};

export default Loading;
