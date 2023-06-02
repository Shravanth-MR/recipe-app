import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);
  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      // const apiKey = "db03b34d48e14786b2250a6e62bbfc35";
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=15`
      );
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                  </Link>
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4em 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 75%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 10%;
    display: flex;
    justify-context: center;
    align-items: center;
  }
  // img {
  //   border-radius: 2rem;
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   object-fit: cover;
  // }
  // p {
  //   position: absolute;
  //   z-index: 10;
  //   left: 50%;
  //   bottom: 0%;
  //   transform: translate(-50%, 0%);
  //   color: white;
  //   width: 75%;
  //   text-align: center;
  //   font-weight: 600;
  //   font-size: 1rem;
  //   max-height: 10%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   overflow: hidden;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  // }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
