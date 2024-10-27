import styled, {css} from 'styled-components';

type TColor = 'primary'|'danger'|'gray';

const RoundButton = styled.button<{
    color: TColor,
}>`
  border-radius: 99em;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color .1s;
  margin-right: 5px;
  margin-left: 5px;
  padding: 0;


  ${props => props.color === 'primary' && css`
    --round-btn-color: var(--primary-color);
  `}

  ${props => props.color === 'danger' && css`
    --round-btn-color: var(--danger-color);
  `}
  ${props => props.color === 'primary' && css`
    --round-btn-color: var(--primary-color);
  `}

  ${props => props.color === 'gray' && css`
    --round-btn-color: #bdbdbd;
  `}


  > svg {
      transition: color .1s;
      color: var(--round-btn-color);
  }

  :hover {
      > svg {
          color: #fff;
      }
      background: var(--round-btn-color);
  }
`;


export default RoundButton;
