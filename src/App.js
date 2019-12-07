import React from "react";
import "./App.css";
import { PokemonCard } from "./common/components/PokemonCard";
import { fetchKantoPokemon, fetchImg } from "./helpers";

class App extends React.Component {
  state = {
    pokemons: null,
    loading: false
  };

  async componentDidMount() {}

  handleInputChange = e => {
    this.setState(
      {
        noOfPokemon: e.target.value,
        loading: true
      },
      async () => {
        const { noOfPokemon } = this.state;
        if (!noOfPokemon) {
          this.setState({
            loading: false
          });
          return;
        }
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${noOfPokemon}`;
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
          pokemons,
          loading: false
        });
      }
    );
  };

  render() {
    const { pokemons, noOfPokemon, loading } = this.state;
    return (
      <React.Fragment>
        <div className='input-holder'> 
        Enter number of pokemon:{" "}
        <input
          value={noOfPokemon}
          onChange={this.handleInputChange}
          style={{
            marginBottom: "1rem"
          }}
        />
        {loading ? <h2>Loading...</h2> : null}
        </div>
        <div className="container">
          {pokemons
            ? pokemons.map(pokemon => {
                const { name, id, img } = pokemon;
                return <PokemonCard name={name} id={id} img={img} key={id} />;
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
