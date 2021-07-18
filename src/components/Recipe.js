import NavBar from "./Navigation";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const Recipe = () => {
  let [info, setInfo] = useState({
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
  ];

  let id = useParams().id;

  let history = useHistory();

  const getRecipe = async () => {
    let responseFromGet = await fetch(`http://localhost:3001/recipe/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
    })
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
        name: responseFromGet.recipe.name,
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
        <div>{info.name}</div>
      </div>
    );
  }
};

export default Recipe;
