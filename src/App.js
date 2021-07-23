import background from "./images/home-image.jpeg";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginAndSignup from "./components/LoginAndSignup";
import Session from "./components/Session";
import Recipe from "./components/Recipe";
import NewAndUpdate from "./components/NewAndUpdate";
import GoOut from "./components/GoOut";
import "./App.css";

const App = () => {
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home></Home>;
          }}
        />
        <Route
          exact
          path="/signup"
          render={() => {
            return <LoginAndSignup typeOfForm="signup"></LoginAndSignup>;
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return <LoginAndSignup typeOfForm="login"></LoginAndSignup>;
          }}
        />
        <Route
          exact
          path="/logout"
          render={() => {
            window.localStorage.clear();
            return <LoginAndSignup typeOfForm="login"></LoginAndSignup>;
          }}
        />
        <Route
          exact
          path="/session"
          render={() => {
            return <Session></Session>;
          }}
        />
        <Route
          exact
          path="/recipe/:id"
          render={() => {
            return <Recipe></Recipe>;
          }}
        />
        <Route
          exact
          path="/notPermitted"
          render={() => {
            return <GoOut></GoOut>;
          }}
        />
        <Route
          exact
          path="/newRecipe"
          render={() => {
            return <NewAndUpdate typeOfForm="new-recipe"></NewAndUpdate>;
          }}
        />
        <Route
          exact
          path="/updateRecipe"
          render={() => {
            return <NewAndUpdate typeOfForm="update-recipe"></NewAndUpdate>;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
