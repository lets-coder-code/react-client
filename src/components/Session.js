import React from "react";
import NavBar from "./Navigation";
import Loading from "./Loading";
import { Link, useHistory } from "react-router-dom";
const { useState, useEffect } = React;

const Session = () => {
  let [info, setInfo] = useState({
    name: "",
    recipes: [],
    loaded: false,
  });

  let links = [
    ["Log out", "/logout", 0],
    ["My home", "/session", 1],
    ["Following", "/", 2],
    ["Favourites", "/", 3],
  ];

  let history = useHistory();

  const getUser = async () => {
    let responseFromGet = await fetch("http://localhost:3001/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    if (responseFromGet.auth === false) {
      history.push("/notPermitted");
    } else {
      setInfo({
        ...info,
        name: responseFromGet.user.name,
        recipes: responseFromGet.user.recipes,
        loaded: true,
      });
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (info.loaded === false) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="session-container light-green-bg">
        <NavBar links={links}></NavBar>
        <h2 className="margin-bottom-2-dot-5 medium-font kalam-font">
          Welcome {info.name}
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="align-center">Recipe</div>
              </th>
              <th>
                <div className="align-center">Country of origin</div>
              </th>
              <th>
                <div className="align-center">Recipe detail</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {info.recipes.map((recipe) => {
              return (
                <tr key={`${recipe._id}`}>
                  <td>
                    <div className="align-center">{recipe.name}</div>
                  </td>
                  <td>
                    <div className="align-center">{recipe.country}</div>
                  </td>
                  <td>
                    <Link to={`/recipe/${recipe._id}`}>
                      <div className="align-center">{recipe.name} detail</div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Session;
