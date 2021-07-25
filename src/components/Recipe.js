import NavBar from "./Navigation";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const Recipe = () => {
  let [info, setInfo] = useState({
    id: useParams().id,
    name: "",
    country: "",
    ingredients: [],
    preparation: "",
    loaded: false,
    auth: false,
  });

  let links = [
    ["Log out", "/logout", 0],
    ["My home", "/session", 1],
    ["Following", "/", 2],
    ["Favourites", "/", 3],
    ["Search recipe", "/searchRecipe", 4],
    ["Search user", "/searchUser", 5],
  ];

  let history = useHistory();

  const getRecipe = async () => {
    let responseFromGet = await fetch(
      `http://localhost:3001/recipe/${info.id}`,
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
    if (responseFromGet.auth === false) {
      history.push("/notPermitted");
    } else {
      setInfo({
        ...info,
        name: responseFromGet.recipe.name,
        country: responseFromGet.recipe.country,
        ingredients: responseFromGet.recipe.ingredients,
        preparation: responseFromGet.recipe.preparation,
        loaded: true,
      });
    }
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (info.loaded === false) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="session-container light-green-bg">
        <NavBar links={links}></NavBar>
        <div className="options-container margin-bottom-4">
          <Link
            to={`/updateRecipe/${info.id}/${info.name}/${info.country}/${info.ingredients}/${info.preparation}`}
            style={{ textDecoration: "none" }}
          >
            <div className="link option-link">Update</div>
          </Link>
          <Link to={`/deleteRecipe/${info.id}`} style={{ textDecoration: "none" }}>
            <div className="link delete-link">Delete</div>
          </Link>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>Name: {info.name}</td>
            </tr>
            <tr>
              <td>Country: {info.country}</td>
            </tr>
            <tr>
              <td>
                Ingredients: 
                {info.ingredients.map((ingredient) => {
                  return (
                    <span className="margin-left-2" key={ingredient}>
                      {ingredient}
                    </span>
                  );
                })}
              </td>
            </tr>
            <tr>
              <td>
                Preparation:
                <span className="line-height-2"> {info.preparation}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default Recipe;
