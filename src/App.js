import { Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Session from "./components/session/session";
import "./App.css";

const App = () => {
  return (
    <div className="app">
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
          path="/login"
          render={() => {
            return <Login></Login>;
          }}
        />
        <Route
          exact
          path="/signup"
          render={() => {
            return <Signup></Signup>;
          }}
        />
        <Route
          exact
          path="/session"
          render={() => {
            return <Session></Session>;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
