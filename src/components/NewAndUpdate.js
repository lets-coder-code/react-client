import NavBar from "./Navigation";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const NewAndUpdate = (props) => {
  let [info, setInfo] = useState({
    name: "",
    country: "",
    ingredients: "",
    preparation: "",
    loading: true,
    title: "",
    url: "",
  });

  let history = useHistory();

  let links = [
    ["Log out", "/logout", 0],
    ["My home", "/session", 1],
    ["Following", "/", 2],
    ["Favourites", "/", 3],
  ];

  const selectForm = () => {
    if (props.typeOfForm === "new-recipe") {
      setInfo({
        ...info,
        title: "New recipe",
        url: "http://localhost:3001/newRecipe",
      });
    } else if (props.typeOfForm === "update-recipe") {
      setInfo({
        ...info,
        title: "Update recipe",
        name: props.name,
        country: props.country,
        ingredientsArr: props.ingredients,
        preparation: props.preparation,
        url: "http://localhost:3001/updateRecipe",
      });
    }
  };

  const postInfo = async () => {
    let ingredientsArr = info.ingredients.split(", ");
    let responseFromPost = await fetch(info.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
      body: JSON.stringify({
        name: info.name,
        country: info.country,
        ingredients: ingredientsArr,
        preparation: info.preparation,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    if (responseFromPost.auth === true) {
      history.push(`/recipe/${responseFromPost.recipe._id}`);
    } else if (responseFromPost.auth === false) {
      history.push("/notPermitTed");
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
    postInfo();
  };

  useEffect(() => {
    selectForm();
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
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Country</p>
        </label>
        <input
          type="text"
          name="country"
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Ingredients</p>
        </label>
        <input
          type="text"
          name="ingredients"
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
        />
        <label className="margin-bottom-1-dot-2">
          <p className="little-font white-font">Preparation</p>
        </label>
        <textarea
          type="text"
          name="preparation"
          onChange={handleChange}
          className="margin-bottom-1-dot-5 little-font form-input"
          rows="10"
        />
        <input
          type="submit"
          value="Submit"
          className="little-font button white-border-radius margin-bottom-1-dot-2"
        />
      </form>
    </div>
  );
};

export default NewAndUpdate;
