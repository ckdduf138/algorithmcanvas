import React from "react";
import { ReactSVG } from "react-svg";
import styled from "styled-components";

const ButtonWapper = styled.button`
  display: flex;
  justify-content: space-evenly;
  width: 180px;
  min-width: 120px;
  min-height: 42px;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  transition: background-color 0.3s;
  align-items: center;
  user-select: none;
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const RightImgWapper = styled.div`
  right: 10%;

  svg {
    width: 28px;
    height: 28px;
  }
  
  svg path {
      stroke: #fff;
  }
`;

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  rightImg : string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children, rightImg }) => {
  return (
    <ButtonWapper onClick={onClick} disabled={disabled}>
      {children}
      <RightImgWapper>
        <ReactSVG src={rightImg} /> 
      </RightImgWapper>
    </ButtonWapper>
  );
};

export default Button;
