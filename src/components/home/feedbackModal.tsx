import React, { FC } from "react";
import styled from "styled-components";
import { formatTimestamp } from "../../utils/common";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 480px;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:first-child {
    background: #ccc;
    color: #333;
  }

  &:last-child {
    background: #007bff;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const FeedbackModal: FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
    const content = (e.currentTarget.elements.namedItem("content") as HTMLTextAreaElement).value;

    const timestamp = new Date();

    const time = formatTimestamp(timestamp)

    console.log("Feedback Submitted:", { title, content, time });

    onSubmit();
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>피드백 작성</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="title">제목</label>
          <Input type="text" id="title" name="title" placeholder="제목을 입력하세요" required />
          <label htmlFor="content">내용</label>
          <TextArea id="content" name="content" placeholder="내용을 입력하세요" rows={5} required />
          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">제출</Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default FeedbackModal;

