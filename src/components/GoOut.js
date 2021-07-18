import NavBar from "./Navigation";
import goOutGift from "../images/giphy.gif";

const GoOut = () => {
  let links = [
    ["Home", "/", 0],
    ["Sign up", "/signup", 1],
    ["Log in", "/login", 2],
  ];
  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <img src={goOutGift} alt="You are not permitted here." />
    </div>
  );
};

export default GoOut;
