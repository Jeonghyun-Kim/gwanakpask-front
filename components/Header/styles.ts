import styled from 'styled-components';

import { HEADER_HEIGHT } from '../../defines';

export const HeaderRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 6px;
  z-index: 99;

  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 10px;
    max-width: 2000px;
  }
`;

export const MenuItemRoot = styled.div`
  padding: 0 10px;
  .menu-item-title {
    font-size: 0.75rem;
    font-weight: 500;
    color: #9e9e9e;
  }
`;

export default { HeaderRoot, MenuItemRoot };
