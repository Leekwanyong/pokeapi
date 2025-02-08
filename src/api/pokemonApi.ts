import axios from 'axios';
import {
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

export const getFlavorTextData = async () => {
  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species?limit=150`,
  );
  const speciesFilter = await axios.all(
    speciesResponse.data.results.map((item) => axios.get(item.url)),
  );

  const flavorTextData: FlavorTextData[] = speciesFilter.flatMap(
    (item, index) => {
      const flavor = item.data.flavor_text_entries.find(
        (entry) => entry.language.name === 'ko',
      );
      return flavor ? [{ id: index, flavor_text: flavor.flavor_text }] : [];
    },
  );

  const genusTypeData: GenusType[] = speciesFilter.flatMap((item, index) => {
    const genus = item.data.genera.find(
      (entry) => entry.language.name === 'ko',
    );
    return genus ? [{ id: index, genus: genus.genus }] : [];
  });

  return {
    flavorTextData,
    genusTypeData,
  };
};
