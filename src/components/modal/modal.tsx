// Modal.tsx
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 77%;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Heading = styled.h2`
    font-size: 24px;
`;

const Content = styled.h1`
    font-size: 18px;
    margin-bottom: 20px;
    line-height: 1.5;
    color: #555;
`;

const Button = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #218838;
    }
`;

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Heading>알고리즘 캔버스에 오신 것을 환영합니다!</Heading>

        <Content>
            Algorithm Canvas는 알고리즘 시각화를 통해 복잡한 알고리즘과 자료구조를 쉽게 이해할 수 있는 학습 플랫폼입니다. 
            그래프 탐색, 정렬, 트리와 같은 다양한 알고리즘을 실시간 시뮬레이션으로 직관적으로 경험할 수 있습니다.
        </Content>

        <Content>
            주요 알고리즘의 동작 과정을 눈으로 확인하며 직접 실습할 수 있어, 문제 해결 능력을 효과적으로 향상시킬 수 있습니다. 
            이 플랫폼은 사용자 친화적인 UI로 설계되어 누구나 쉽게 사용할 수 있습니다.
        </Content>

        <Content>
            알고리즘 학습이 필요한 학생, 개발자 및 모든 학습자를 위해 만들어진 Algorithm Canvas와 함께 더 깊이 있는 학습을 경험해 보세요.
        </Content>

        <Button onClick={onClose}>시작하기</Button>
        
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
