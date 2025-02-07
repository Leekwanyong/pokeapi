import React, { useEffect, useRef, useState } from 'react';
import { getPokemon } from '../api/pokemonApi.ts';
import styled from 'styled-components';
import Modal from './Modal.tsx';
import { Props } from '../types/Card/cardType';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from './Loading.tsx';

const Card = () => {
  const [modalProps, setModalProps] = useState<Props>({ id: 0, check: false });
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['pokemon-species'],
      queryFn: ({ pageParam = 0 }) => getPokemon(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage?.nextPage ?? undefined;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const toggleModal = () => {
    setModalProps((prev) => ({
      ...prev,
      check: !prev.check,
    }));
  };

  if (isLoading) return <Loading loading={isLoading} />;
  if (isError) return <p>{isError}</p>;
  return (
    <Wrapper>
      <Title>포켓몬 도감</Title>
      <Ul>
        {data?.pages.map((item, pageIndex) =>
          item.items.map((v, index) => (
            <ListItem
              key={index}
              onClick={() => {
                toggleModal();
                setModalProps((prev) => ({ ...prev, id: index }));
              }}
            >
              <div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pageIndex * 30 + index + 1}.png`}
                  alt={v.name}
                />
              </div>
              {v.name}
            </ListItem>
          )),
        )}
      </Ul>
      <div
        ref={observerRef}
        style={{ height: '100px', background: 'red' }}
      ></div>
      {modalProps.check && (
        <Modal
          id={modalProps.id}
          onClick={toggleModal}
          check={modalProps.check}
        />
      )}
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
