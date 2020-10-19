import styled from 'styled-components';

interface Props {
  size: {
    width: string | number;
    height: string | number;
  };
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  opacities: {
    start: number;
    end: number;
  };
  vertical: boolean;
}
const Gradient = styled.div<Props>`
  position: absolute;
  background: rgba(0, 0, 0);
  background: linear-gradient(
    ${(props) => (props.vertical ? 0 : 90)}deg,
    rgba(13, 13, 13, ${(props) => props.opacities.start}) 0%,
    rgba(13, 13, 13, ${(props) => props.opacities.end}) 100%
  );
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};
  top: ${(props) => props.position.top ?? 'initial'};
  right: ${(props) => props.position.right ?? 'initial'};
  bottom: ${(props) => props.position.bottom ?? 'initial'};
  left: ${(props) => props.position.left ?? 'initial'};
`;

export default Gradient;
