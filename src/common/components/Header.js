import React from "react";

export const Header = props => {
  const { name, id } = props;
  return (
    <div className="pokemon-card-header">
      <div >{id}</div>
      <div>{name}</div>
    </div>
  );
};
