import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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
}

const Modal = ({ id }: Props) => {
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

  return ReactDOM.createPortal(
    <div>
      <Ul>
        {findFlavorTextData.map((item, index) => (
          <li key={index}>
            <div>
              <ImgContainer>
                <p>No.{id + 1}</p>
                <Img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`}
                  alt={item.name}
                />
              </ImgContainer>
              <p>{item.flavor_text}</p>
              {findGenusData.map((v) => (
                <p key={index}>{v.genus}</p>
              ))}
            </div>
          </li>
        ))}
      </Ul>
    </div>,
    document.body,
  );
};

export default Modal;

const Ul = styled.ul`
  list-style: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0;
  padding: 0;
  background-color: #5ac2ef;
`;

const ImgContainer = styled.div`
  image-rendering: pixelated;
  border: 1px solid black;
  background-color: #ffff;
  border-radius: 8px 8px 0 0;
`;

const Img = styled.img`
  width: 60%;
`;
