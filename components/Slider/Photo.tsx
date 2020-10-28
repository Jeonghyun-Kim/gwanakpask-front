import React from 'react';
import styled from 'styled-components';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

// import useLayout from '../../lib/useLayout';

// import AppContext from '../../AppContext';

const Root = styled(a.img)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  max-width: min(500px, 100% - 40px);
  max-height: 60%;
  width: auto;
  height: auto;
  box-shadow: rgba(0, 20, 0, 0.2) 10px 7px 10px 3px;
  border-radius: 1px;
  z-index: 1;
`;

interface props {
  title: string;
  src: string;
  zoomScales: number[];
  zoomIn: number;
}
const Photo: React.FC<props> = ({
  title,
  src,
  zoomScales,
  zoomIn,
  ...props
}) => {
  // TODO: pre-calculate width and height
  // const {
  //   withLayout,
  //   size: { innerWidth, innerHeight },
  // } = useLayout();

  const [{ x, y, zoom }, setSpring] = useSpring(
    () => ({
      x: 0,
      y: 0,
      zoom: zoomScales[zoomIn],
      config: { tension: 250 },
    }),
    [],
  );

  const bind = useGesture({
    onDrag: ({
      down,
      touches,
      offset: [xOffset, yOffset],
      lastOffset: [lastX, lastY],
      cancel,
      canceled,
    }) => {
      if (!zoomIn) {
        if (cancel) cancel();
      } else {
        setSpring({
          x:
            down && touches === 1
              ? (xOffset - lastX) * (1 + (zoomScales[zoomIn] - 1) / 2)
              : 0,
          y:
            down && touches === 1
              ? (yOffset - lastY) * (1 + (zoomScales[zoomIn] - 1) / 2)
              : 0,
        });
      }
      if (canceled) setSpring({ x: 0, y: 0 });
    },
  });

  React.useEffect(() => {
    setSpring({ zoom: zoomScales[zoomIn] });
  }, [zoomIn, setSpring, zoomScales]);

  return (
    <Root
      {...props}
      {...bind()}
      className="unselectable"
      style={{
        x,
        y,
        scale: zoom,
      }}
      alt={title}
      src={src}
    />
  );
};

export default Photo;
