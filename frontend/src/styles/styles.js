import styled, { css } from "styled-components";

export const ContextMenu = styled.div`
  position: relative;
  font-size: 12px;
  width: 100px;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 5px;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 5px 6px;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: #000000;
  }
`;
