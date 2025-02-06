import axios from 'axios'

interface KoreaPokemonNameType {
  language: {
    name: string, url: string,
  }
  name: string
}

interface FlavorTextData  {
  id: number
  flavor_text: string;
}

interface GenusType {
  id: number;
  genus: string;
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

export const getFlavorTextData = async (): Promise<FlavorTextData[]> => {
  const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=150`)
  const speciesFilter = await Promise.all(speciesResponse.data.results.map((item) => axios.get(item.url)));
  const koreaPokemonName= speciesFilter.map((item) => item.data.flavor_text_entries.find(item => item.language.name === 'ko'));
  const flavorTextData: FlavorTextData[] = koreaPokemonName.map((item, index) =>   ({
    id: index,
    flavor_text: item.flavor_text,
  }))

  console.log(flavorTextData);

  return flavorTextData
}

export const getGenusTypeData = async (): Promise<GenusType[]>  => {
  const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=150`)
  const speciesFilter = await Promise.all(speciesResponse.data.results.map((item) => axios.get(item.url)));
  const koreaPokemonName = speciesFilter.map((item) => item.data.genera.find(item => item.language.name === 'ko'));
  const genusTypeData: GenusType[] = koreaPokemonName.map((item, index) => ({
    id: index,
    genus: item.genus
  }))
  return genusTypeData
}