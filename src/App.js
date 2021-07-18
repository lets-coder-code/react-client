import background from "./images/home-image.jpeg";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Session from "./components/Session";
import Recipe from "./components/Recipe";
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
            return <Form typeOfForm="signup"></Form>;
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return <Form typeOfForm="login"></Form>;
          }}
        />
        <Route
          exact
          path="/logout"
          render={() => {
            window.localStorage.clear();
            return <Form typeOfForm="login"></Form>;
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
      </Switch>
    </div>
  );
};

export default App;
