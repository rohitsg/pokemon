import React from "react";
import "./App.css";
import img from "./img.png";
import { PokemonCard } from "./common/components/PokemonCard";
import { fetchKantoPokemon } from "./helpers";

class App extends React.Component {
  state = {
    pokemons: null
  }
  async componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=3&offset=3";
    fetchKantoPokemon(url)

  }
  render() {
    return (
      <div className="App">
        {/* <PokemonCard name={name} id={id} img={img} /> */}
        <img src={img} width="800" height="400" />
      </div>
    );
  }
}

export default App;
