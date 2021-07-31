import background from "./images/home-image.jpeg";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginAndSignup from "./components/LoginAndSignup";
import Session from "./components/Session";
import Recipe from "./components/Recipe";
import NewAndUpdate from "./components/NewAndUpdate";
import GoOut from "./components/GoOut";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Search from "./components/Search";
import User from "./components/User";
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
          path="/myRecipe/:id"
          render={() => {
            return <Recipe owner="me"></Recipe>;
          }}
        />
        <Route
          exact
          path="/othersRecipe/:id"
          render={() => {
            return <Recipe owner="other"></Recipe>;
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
          path="/updateRecipe/:id/:name/:country/:ingredients/:preparation"
          render={() => {
            return <NewAndUpdate typeOfForm="update-recipe"></NewAndUpdate>;
          }}
        />
        <Route
          exact
          path="/deleteRecipe/:id"
          render={() => {
            return <DeleteConfirmation></DeleteConfirmation>;
          }}
        />
        <Route
          exact
          path="/searchRecipe"
          render={() => {
            return <Search typeOfElement="recipe"></Search>;
          }}
        />
        <Route
          exact
          path="/searchUser"
          render={() => {
            return <Search typeOfElement="user"></Search>;
          }}
        />
        <Route
          exact
          path="/user/:userId"
          render={() => {
            return <User></User>;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
