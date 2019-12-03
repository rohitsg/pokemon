import React from "react";

export const Header = props => {
  const { name, id } = props;
  return (
    <div className="pokemon-card-header">
      <div>{name}</div>
      <div>{id}</div>
    </div>
  );
};
