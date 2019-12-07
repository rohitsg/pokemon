import React from "react";
import { Header } from "./Header";
import { ImageContainer } from "./ImageContainer";
import './styles.css'

export const PokemonCard = props => {
  const { name, id, img } = props;
  return (
    <div className='container-image-card'>
      <Header name={name} id={id} />
      <ImageContainer img={img} />
    </div>
  );
};
