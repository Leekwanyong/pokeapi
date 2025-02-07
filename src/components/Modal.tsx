import React, { useEffect, useState } from 'react';
import {
  FlavorTextData,
  GenusType,
  getFlavorTextData,
  getGenusTypeData,
} from '../api/pokemonApi.ts';
import styled from 'styled-components';

interface ModalData {
  flavorText: FlavorTextData[];
  genus: GenusType[];
}

interface Props {
  id: number;
  check: boolean;
  onClick: () => void;
}

const Modal = ({ id, check, onClick }: Props) => {
  const [modalData, setModalData] = useState<ModalData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const flavorTextData = await getFlavorTextData();
        const genusData = await getGenusTypeData();
        setModalData([{ flavorText: flavorTextData, genus: genusData }]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const findFlavorTextData = modalData.map((item) =>
    item.flavorText.find((v) => v.id === id),
  );

  const findGenusData = modalData.map((item) =>
    item.genus.find((v) => v.id === id),
  );

  // 여기서 state를 하나 더 만들어서 modal에 클릭을 관리하는 것 보다 기존 modal을 받아와서 업데이트 하는 것이 더 좋음
  // map 함수로 두 개를 돌렸는데 이게 더 나은 방법인가? 하나의 배열로 만들어서 해봤지만 같은 dom 요소가 두개가 생성 되었다.
  // 이는 그 전에 있는 것을 가져와서 그런데 map 함수를 두 개 쓰는 방법 말고는 해결 방법을 잘 몰르겠다...
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
