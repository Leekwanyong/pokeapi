import { FlavorTextData, GenusType } from '../PoketApi/pokemonApiType';

export interface ModalData {
  flavorText: FlavorTextData[];
  genus: GenusType[];
}

export interface Props {
  id: number;
  check: boolean;
  onClick: () => void;
}
