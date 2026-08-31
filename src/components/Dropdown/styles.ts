import styled from "styled-components";

export const Dropdown = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  border: 1px solid ${(props) => props.theme["border"]};
  border-radius: 8px;
  color: ${(props) => props.theme["text"]};
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme["primary"]};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme["primary"]};
    box-shadow: 0 0 0 2px ${(props) => props.theme["primary"]}33;
  }
`;

export const Arrow = styled.span<{ $isOpen: boolean }>`
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme["border"]};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const DropdownOption = styled.button<{
  $selected: boolean;
}>`
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  text-align: left;
  cursor: pointer;
  background-color: ${(props) => props.$selected && props.theme["primary"]};

  color: ${(props) => props.$selected && props.theme["white"]};

  &:hover {
    background-color: ${(props) => props.theme["primary"]};
    color: ${(props) => props.theme["white"]};
  }
`;
