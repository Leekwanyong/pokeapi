import axios from 'axios';
import {
  FlavorTextData,
  GenusType,
  KoreaPokemonNameType,
} from '../types/PoketApi/pokemonApiType.ts';

export const getPokemon = async (
  offset = 0,
): Promise<{ items: KoreaPokemonNameType[]; nextPage?: number }> => {
  const limit = 30;
  const maxCount = 150;

  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`,
  );
  const speciesFilter = await axios.all(
    speciesResponse.data.results.map((item) => axios.get(item.url)),
  );

  const koreaPokemonName = speciesFilter.map((item) =>
    item.data.names.find((item) => item.language.name === 'ko'),
  );
  const nextOffset = offset + limit;
  const hasMoreData = nextOffset < maxCount;

  return {
    items: koreaPokemonName,
    nextPage: hasMoreData ? nextOffset : undefined,
  };
};

export const getFlavorTextData = async (): Promise<FlavorTextData[]> => {
  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species?limit=150`,
  );
  const speciesFilter = await axios.all(
    speciesResponse.data.results.map((item) => axios.get(item.url)),
  );
  const koreaPokemonName = speciesFilter.map((item) =>
    item.data.flavor_text_entries.find((item) => item.language.name === 'ko'),
  );
  const flavorTextData = koreaPokemonName.map((item, index) => ({
    id: index,
    flavor_text: item.flavor_text,
  }));

  return flavorTextData;
};

export const getGenusTypeData = async (): Promise<GenusType[]> => {
  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species?limit=150`,
  );
  const speciesFilter = await axios.all(
    speciesResponse.data.results.map((item) => axios.get(item.url)),
  );
  const koreaPokemonName = speciesFilter.map((item) =>
    item.data.genera.find((item) => item.language.name === 'ko'),
  );
  const genusTypeData = koreaPokemonName.map((item, index) => ({
    id: index,
    genus: item.genus,
  }));
  return genusTypeData;
};
