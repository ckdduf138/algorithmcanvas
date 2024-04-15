import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import App from './App';

// 전역 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
`;

// 루트 요소 설정
const Root = styled.div`
  width: 100%;
  height: 100%;
`;

// 애플리케이션 렌더링
ReactDOM.render(
  <Root>
    <GlobalStyle />
    <App />
  </Root>,
  document.getElementById('root')
);
