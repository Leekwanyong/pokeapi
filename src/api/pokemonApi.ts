import axios from 'axios'

interface KoreaPokemonNameType {
  language: {
    name: string, url: string,
  }
  name: string
}

export const getPokemonList = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`)
    return response.data.results
}

export const getPokemon = async (): Promise<KoreaPokemonNameType[] > => {
  const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=150`)
  const speciesFilter = await Promise.all(speciesResponse.data.results.map((item) => axios.get(item.url)));
  const koreaPokemonName: KoreaPokemonNameType[] = speciesFilter.map((item) => item.data.names.find(item => item.language.name === 'ko'));

  return koreaPokemonName
}
