import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Searched() {
  const [searchedRecipes, setSearchedRecipies] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipies(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return <div>Searched</div>;
}

export default Searched;
