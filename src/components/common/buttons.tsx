import React from "react";
import { ReactSVG } from "react-svg";
import styled from "styled-components";

const ButtonWapper = styled.button`
  display: flex;
  justify-content: space-evenly;
  width: 180px;
  min-width: 120px;
  min-height: 52px;
  padding: 0px 10px;
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
  display: flex;
  position: relative;
  left: 10%;
  width: 24px;
  min-height: 52px;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
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
        <ReactSVG src={rightImg} wrapper='svg'/> 
      </RightImgWapper>
    </ButtonWapper>
  );
};

export default Button;
