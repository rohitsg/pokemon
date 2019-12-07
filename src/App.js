import React from "react";
import "./App.css";
import { PokemonCard } from "./common/components/PokemonCard";
import { fetchKantoPokemon, fetchImg } from "./helpers";

class App extends React.Component {
  state = {
    pokemons: null
  };

  async componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=300";
    const response = await fetchKantoPokemon(url);
    const pokemons = [];
    response.forEach(pokemon => {
      pokemons.push({
        id: pokemon.id,
        name: pokemon.name
      });
    });
    const images = await fetchImg(pokemons);
    pokemons.forEach((pokemon, index) => {
      pokemon.img = images[index];
    });
    this.setState({
      pokemons
    });
  }

  render() {
    const { pokemons } = this.state;
    return (
      <div className="container">
        {pokemons ? pokemons.map(pokemon => {
          const { name, id, img } = pokemon;
          return  <PokemonCard name={name} id={id} img={img} key={id} />;
        }) : null}
      </div>
    );
  }
}

export default App;
