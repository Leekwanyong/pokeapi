import React, { useEffect, useState } from 'react';
import { getPokemon } from '../api/pokemonApi.ts';
import styled from 'styled-components';
import Loading from './Loading.tsx';
import Modal from './Modal.tsx';

interface Props {
  id: number;
  check: boolean;
}

const Card = () => {
  const [krPokemon, setKrPokemon] = useState([]);
  const [modalProps, setModalProps] = useState<Props>({ id: 0, check: false });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const koreaResponsePokemon = await getPokemon();
        setLoading(false);
        setKrPokemon(koreaResponsePokemon);
      } catch (e) {
        setError('데이터를 불러오는 중 오류가 발생했습니다!');
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading loading={loading} />;
  if (error) return <p>{error}</p>;

  return (
    <Wrapper>
      <Title>포켓몬 도감</Title>
      <Ul>
        {krPokemon.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => {
              setModalProps((prev) => ({
                ...prev,
                id: index,
                check: !prev.check,
              }));
            }}
          >
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={item.name}
              />
            </div>
            {item.name}
          </ListItem>
        ))}
      </Ul>
      {modalProps.check && <Modal id={modalProps.id} />}
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align: center;
  color: #ffcc00;
  text-shadow:
    2px 2px #000,
    4px 4px #ff0000;
`;

const Ul = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
`;

const ListItem = styled.li`
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 15px;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;
