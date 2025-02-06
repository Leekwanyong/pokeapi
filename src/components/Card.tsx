import React, { useEffect, useState } from 'react'
import { getPokemon, getPokemonList } from '../api/pokemonApi.ts'
import styled from 'styled-components'

const Card = () => {
  const [krPokemon, setKrPokemon] = useState([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async  () => {
      try {
        const koreaResponsePokemon = await getPokemon();
        setKrPokemon(koreaResponsePokemon)
      setLoading(false);
      } catch (e) {
        setError('데이터를 불러오는 중 오류가 발생했습니다!');
      }
    }
    fetchData();
  }, [])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Wrapper>
      <Title>포켓몬 도감</Title>
      <Ul>
      {
        krPokemon.map((item, index) => <ListItem>
          <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            alt={item.name}
          />
          </div>
          {item.name}
        </ListItem>)
      }
      </Ul>
    </Wrapper>
  )
}

export default Card

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `

const Title = styled.h2`
    font-weight: bold;
    text-align: center;
    color: #ffcc00;
    text-shadow: 2px 2px 0px #000, 4px 4px 0px #ff0000;
`

const Ul = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
   
`

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
`