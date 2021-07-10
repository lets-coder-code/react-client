import "./Login.css";
import React from "react";
import { useHistory } from "react-router-dom";
const useState = React.useState;

const Login = () => {
  let [info, setInfo] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let myToken = await postLogin();
    saveToken(myToken);
    redirect();
  };

  const postLogin = async () => {
    let responseFromPost = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    return responseFromPost.token;
  };

  const saveToken = (tokenElement) => {
    window.localStorage.setItem("token", tokenElement);
  };

  const redirect = () => {
    history.push("/session");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit}>
        <label>User name</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
