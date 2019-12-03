import React from "react";
import { Header } from "./Header";
import { ImageContainer } from "./ImageContainer";

export const PokemonCard = props => {
  const { name, id, img } = props;
  return (
    <div>
      <Header name={name} id={id} />
      <ImageContainer img={img} />
    </div>
  );
};
