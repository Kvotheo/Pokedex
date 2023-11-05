import React, { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Skeletons } from '../components/Skeletons';
import { Grid } from '@mui/material';
import { Container } from "@mui/system";

export const Home = () => {
  // Inicializa o estado 'pokemons' como um array vazio.
  const [pokemons, setPokemons] = useState([]);

  // useEffect é usado para buscar os dados dos Pokémon quando o componente é montado.
  useEffect(() => {
    getPokemon();
  }, []);

  // Função para buscar os dados dos Pokémon da API.
  const getPokemon = () => {
    var endpoints = [];
    for (var i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    // Faz uma solicitação para cada endpoint e armazena os resultados no estado 'pokemons'.
    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
  };

  // Função para filtrar os Pokémon com base no nome.
  const pokemonFilter = (name) => {
    var filteredPokemons = [];

    if (name === "") {
      getPokemon();
    }

    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    // Define o estado 'pokemons' com os Pokémon filtrados.
    setPokemons(filteredPokemons);
  };

  return (
    <div>
      {/* Renderiza o componente de navegação com a função de filtragem. */}
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {pokemons.length === 0 ? (
            // Se 'pokemons' estiver vazio, renderiza os componentes de esqueleto.
            <Skeletons />
          ) : (
            // Caso contrário, mapeia os dados dos Pokémon e renderiza os cartões.
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};


export default Home;