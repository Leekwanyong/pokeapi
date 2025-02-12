import React from 'react';
import styled from 'styled-components';
import { KoreaPokemonNameType } from '../types/PoketApi/pokemonApiType';

interface Props {
  item: KoreaPokemonNameType[];
  key: number | string;
  page: number;
  index: number;
  onClick: () => void;
  modalOnKey: (id: number) => void;
}

const CardListComponent = ({
  item,
  page,
  index,
  onClick,
  modalOnKey,
}: Props) => {
  const imgKeyId = page * 30 + index + 1;

  return (
    <>
      <ListItem
        onClick={() => {
          onClick();
          modalOnKey(imgKeyId);
        }}
      >
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgKeyId}.png`}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              imageRendering: 'pixelated',
            }}
          />
        </div>
        <p>{item.name}</p>
      </ListItem>
    </>
  );
};
const CardList: React.MemoExoticComponent<React.FC<Props>> =
  React.memo(CardListComponent);

export default CardList;

const ListItem = styled.li`
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 15px;
  transition: transform 0.2s;
  cursor: pointer;
  @media (max-width: 480px) {
    width: 300px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
