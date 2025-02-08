import React from 'react';
import styled from 'styled-components';
import { Props } from '../types/Card/cardType';
import { getFlavorTextData } from '../api/pokemonApi.ts';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading.tsx';

const Modal = ({ id, check, onClick }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemonDetailData'],
    queryFn: async () => {
      const response = await getFlavorTextData();
      return response;
    },
  });

  const findFlavorTextData = (data?.flavorTextData ?? []).filter(
    (item) => item.id === id,
  );

  const findGenusData = (data?.genusTypeData ?? []).filter(
    (item) => item.id === id,
  );

  if (isLoading) return <Loading loading={isLoading} />;
  if (isError) return <p>{isError}</p>;

  return (
    <>
      {check && (
        <Wrapper onClick={() => onClick()}>
          <Ul>
            {findFlavorTextData.map((item, index) => (
              <li key={index}>
                <div>
                  <p>No.{id + 1}</p>
                  <ImgContainer>
                    <Img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`}
                      alt={item.name}
                    />
                  </ImgContainer>
                  <FlavorText>{item.flavor_text}</FlavorText>
                  {findGenusData.map((v) => (
                    <GenusData key={index}>{v.genus}</GenusData>
                  ))}
                </div>
              </li>
            ))}
          </Ul>
        </Wrapper>
      )}
    </>
  );
};

export default Modal;

// height 범위 떄문에 범위를 넘어가서 클릭하면은 안 닫힘
const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
  width: 350px;
  height: 450px;
  background: #fff8dc;
  border: 4px solid #333;
  border-radius: 12px;
  box-shadow: 8px 8px 0px 0px #888888;
  box-sizing: border-box;
  overflow: hidden;
`;

const ImgContainer = styled.div`
  image-rendering: pixelated;
  background: linear-gradient(45deg, #fefcea, #f1da36);
  border: 4px solid black;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const Img = styled.img`
  width: 60%;
  position: relative;
  animation: moveLeft 3s linear infinite;

  @keyframes moveLeft {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-20%);
    }
  }
`;

const FlavorText = styled.p`
  margin-bottom: 12px;
  font-size: 18px;
`;

const GenusData = styled.p`
  font-size: 18px;
`;
