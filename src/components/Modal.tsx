import React, { useEffect, useState } from 'react';
import {
  FlavorTextData,
  GenusType,
  getFlavorTextData,
  getGenusTypeData,
} from '../api/pokemonApi.ts';

interface ModalData {
  flavorText: FlavorTextData[];
  genus: GenusType[];
}

const Modal = () => {
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

  return <div></div>;
};

export default Modal;
