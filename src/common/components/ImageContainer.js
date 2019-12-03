import React from "react";

export const ImageContainer = props => {
  const { img} = props;
  return (
    <div className="pokemon-card-img-container">
      <img src={img} />
    </div>
  );
};
