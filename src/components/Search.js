import NavBar from "./Navigation";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  let [info, setInfo] = useState({
    auth: false,
    title: "",
    name: "",
    message: "",
  });

  let history = useHistory();

  let links = [
    ["Log out", "/logout", 0],
    ["My home", "/session", 1],
    ["Following", "/", 2],
    ["Favourites", "/", 3],
    ["Search recipe", "/searchRecipe", 4],
    ["Search user", "/searchUser", 5],
  ];

  const getInfo = async () => {
    if (info.name === "") {
      setInfo({
        ...info,
        message: "Write something.",
      });
    } else {
      if (props.typeOfElement === "recipe") {
        let responseFromGet = await fetch(
          `http://localhost:3001/searchRecipe/${info.name}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: window.localStorage.token,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            return result;
          });
        if (responseFromGet.auth === true) {
          if (responseFromGet.recipe === null) {
            setInfo({
              ...info,
              message: responseFromGet.message,
              auth: true,
            });
          } else {
            history.push(`/recipe/${responseFromGet.recipe._id}`);
          }
        } else if (responseFromGet.auth === false) {
          history.push("/notPermitted");
        }
      } else if (props.typeOfElement === "user") {
        let responseFromGet = await fetch(
          `http://localhost:3001/searchUser/${info.name}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              token: window.localStorage.token,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            return result;
          });
        if (responseFromGet.auth === true) {
          if (responseFromGet.user === null) {
            setInfo({
              ...info,
              message: responseFromGet.message,
              auth: true,
            });
          } else {
            history.push(`/user/${responseFromGet.user._id}`);
          }
        } else if (responseFromGet.auth === false) {
          history.push("/notPermitted");
        }
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getInfo();
  };

  useEffect(() => {
    if (props.typeOfElement === "recipe") {
      setInfo({
        ...info,
        title: "Search recipe",
      });
    } else if (props.typeOfElement === "user") {
      setInfo({
        ...info,
        title: "Search user",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="long-form-container light-green-bg">
      <NavBar links={links}></NavBar>
      <form onSubmit={handleFormSubmit} className="form white-border-radius">
        <h2 className="margin-bottom-2-dot-5 medium-font kalam-font bold-font white-font">
          {info.title}
        </h2>
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Name</p>
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <input
          type="submit"
          value="Submit"
          className="little-font button white-border-radius margin-bottom-1-dot-2"
        />
        <div className="form-message-container">
          <p className="little-font red-font align-center">{info.message}</p>
        </div>
      </form>
    </div>
  );
};

export default Search;
