import React from 'react';
import styled from 'styled-components';
import Spinner from '../assets/Spinner.gif';

type Props = {
  loading: boolean;
};

const Loading = ({ loading }: Props) => {
  return (
    <>
      {loading && (
        <Background>
          <LoadingText>
            <img src={Spinner} alt="" />
          </LoadingText>
        </Background>
      )}
    </>
  );
};

export default Loading;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;
