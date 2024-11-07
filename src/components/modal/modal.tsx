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
    width: 55%;
    min-width: 400px;
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
            알고리즘 시각화를 통해 쉽게 이해할 수 있는 학습 플랫폼입니다. 다양한 알고리즘을 실시간으로 경험할 수 있습니다.
        </Content>

        <Content>
            동작 과정을 직접 실행하여 문제 해결 능력을 향상시켜보세요! 사용 친화적으로 설계된 UI로 쉽게 사용하실 수 있습니다.
        </Content>

        <Content>
            Algorithm Canvas와 함께 깊이 있는 학습을 경험해 봅시다!
        </Content>

        <Button onClick={onClose}>시작하기</Button>

      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
