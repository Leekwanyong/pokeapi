import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getPokemon } from '../api/pokemonApi.ts';
import styled from 'styled-components';
import { Props } from '../types/Card/cardType';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from './Loading.tsx';
import CardList from './CardList.tsx';

const Modal = lazy(() => import('./Modal.tsx'));

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

  const handleOntoggleModal = useCallback(() => {
    setModalProps((prev) => ({
      ...prev,
      check: !prev.check,
    }));
  }, []);

  const handleOnModalProps = useCallback((key) => {
    setModalProps((prev) => ({ ...prev, id: key - 1 }));
  }, []);

  if (isLoading) return <Loading loading={isLoading} />;
  if (isError) return <p>{isError}</p>;

  return (
    <Wrapper>
      <Title>포켓몬 도감</Title>
      <Ul>
        {data?.pages.flatMap((page, pageIndex) =>
          page.items.map((pokemon, index) => (
            <CardList
              item={pokemon}
              key={`${pokemon.name}-${pageIndex}`}
              index={index}
              page={pageIndex}
              onClick={handleOntoggleModal}
              modalOnKey={handleOnModalProps}
            />
          )),
        )}
      </Ul>
      <div ref={observerRef} style={{ height: '100px' }}></div>
      {modalProps.check && (
        <Suspense fallback={<Loading loading={isLoading} />}>
          <Modal
            id={modalProps.id}
            onClick={handleOntoggleModal}
            check={modalProps.check}
          />
        </Suspense>
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
  padding: 0;
  margin: 0;
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
    margin: 0;
    gap: 2rem;
  }
`;
