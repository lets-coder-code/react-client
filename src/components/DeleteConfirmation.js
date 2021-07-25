import NavBar from "./Navigation";
import { useParams, useHistory } from "react-router-dom";

const DeleteConfirmation = () => {
  let id = useParams().id;

  let history = useHistory();
  
  let links = [
    ["Log out", "/logout", 0],
    ["My home", "/session", 1],
    ["Following", "/", 2],
    ["Favourites", "/", 3],
    ["Search recipe", "/searchRecipe", 4],
    ["Search user", "/searchUser", 5],
  ];

  const deleteButtonClick = async (event) => {
    event.preventDefault();
    await deleteRecipe();
    history.push("/session");
  };

  const deleteRecipe = async () => {
    await fetch(`http://localhost:3001/deleteRecipe/${id}`, {
      method: "DELETE",
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
  };

  const back = (event) => {
    event.preventDefault();
    history.push(`/recipe/${id}`);
  };

  return (
    <div className="message-container light-green-bg">
      <NavBar links={links}></NavBar>
      <span className="little-font align-center line-height-2 margin-bottom-2-dot-5">
        Are you sure that you want to delete this component?
      </span>
      <div className="buttons-container">
        <button
          className="confirmation-button delete-link"
          onClick={deleteButtonClick}
        >
          Sí
        </button>
        <button className="confirmation-button option-link" onClick={back}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
