import React from 'react';
import styled from 'styled-components';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

// import useLayout from '../../lib/useLayout';

// import AppContext from '../../AppContext';

const Root = styled(a.div)`
  position: relative;
  width: 100%;
  height: 100%;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
    image-rendering: auto;
  }
  .photo-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: min(1200px, 100% - 40px);
    max-height: min(60%, 100% - 100px);
    width: auto;
    height: auto;
    margin: auto;
    box-shadow: rgba(0, 20, 0, 0.5) 0px 1px 3px, rgba(0, 0, 0, 0.4) 0 6px 10px,
      rgba(0, 0, 0, 0.25) -20px 10px 30px;
    transform: translateY(-40px);
    border-radius: 1px;
    z-index: 1;
    image-rendering: auto;
  }
  &.grabbable {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  /* (Optional) Apply a "closed-hand" cursor during drag operation. */
  &.grabbable:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;

const BackgroundImage: React.FC = () => (
  <img
    className="background unselectable"
    alt="white flat wall made of stone"
    src="/images/background/original.jpg"
  />
);

interface props {
  title: string;
  src: string;
  zoomScales: number[];
  zoomIn: number;
  innerWidth: number;
}
const Photo: React.FC<props> = ({
  title,
  src,
  zoomScales,
  zoomIn,
  innerWidth,
  ...props
}) => {
  // TODO: pre-calculate width and height
  // const {
  //   withLayout,
  //   size: { innerWidth, innerHeight },
  // } = useLayout();

  const [{ x, y, scale }, setSpring] = useSpring(
    {
      x: 0,
      y: 0,
      scale: 1,
      config: { tension: 500, friction: 50 },
    },
    [],
  );

  React.useEffect(() => {
    setSpring({ x: 0, y: 0, scale: zoomScales[zoomIn] });
  }, [zoomIn, zoomScales, setSpring]);

  const bind = useGesture(
    {
      onDrag: ({
        // down,
        // touches,
        offset: [xOffset, yOffset],
        // lastOffset: [lastX, lastY],
        cancel,
        // canceled,
      }) => {
        if (!zoomIn) {
          if (cancel) cancel();
        } else {
          setSpring({
            // x:
            //   down && touches === 1
            //     ? (xOffset - lastX) * (1 + (zoomScales[zoomIn] - 1) / 2)
            //     : 0,
            // y:
            //   down && touches === 1
            //     ? (yOffset - lastY) * (1 + (zoomScales[zoomIn] - 1) / 2)
            //     : 0,
            x: xOffset,
            y: yOffset,
          });
        }
        // if (canceled) setSpring({ x: 0, y: 0 });
      },
    },
    {
      drag: {
        bounds: {
          left: (-innerWidth / 4) * zoomScales[zoomIn],
          right: (innerWidth / 4) * zoomScales[zoomIn],
          top: -window.innerHeight / 4 + 80,
          bottom: window.innerHeight / 4 + 80,
        },
      },
    },
  );

  return (
    <Root
      {...props}
      {...bind()}
      className={`unselectable ${zoomIn && 'grabbable'}`}
      style={{
        x,
        y,
        scale,
      }}>
      <BackgroundImage />
      <img className="photo-img unselectable" alt={title} src={src} />
    </Root>
  );
};

export default Photo;
