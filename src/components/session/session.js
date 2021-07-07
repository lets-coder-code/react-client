import React from "react";
const { useState, useEffect } = React;

const Session = () => {
  let [info, setInfo] = useState({
    user: "",
    recipes: [],
  });

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
    let username = responseFromGet.user.username;
    let recipes = [];
    let userRecipes = responseFromGet.user.recipes;
    recipes = userRecipes.map((recipe) => {
      let recipeObject = {
        id: recipe._id,
        name: recipe.name,
        country: recipe.country,
        ingredients: recipe.ingredients,
      };
      return recipeObject;
    });
    let userInfo = {
      username: username,
      recipes: recipes,
    };
    setInformation(userInfo);
  };

  const setInformation = (information) => {
    setInfo({
      user: information.username,
      recipes: information.recipes,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (info.user === "") {
    return <div>Cargando...</div>;
  } else {
    return (
      <div>
        <p>Welcome {info.user}</p>
        <table>
          <caption>Your recipes</caption>
          {info.recipes.map((recipe) => {
            return (
              <tr key={`recipe-container-${recipe.id}`}>
                <td key={`recipe-name-${recipe.id}`}>{recipe.name}</td>
                <td key={`recipe-country-${recipe.id}`}>{recipe.country}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
};

export default Session;
