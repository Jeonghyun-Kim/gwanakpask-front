import React from 'react';
import styled from 'styled-components';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import AppContext from '../../AppContext';

import { NAVBAR_WIDTH } from '../../defines';

const Root = styled.div`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    & > div {
      position: relative;
      background-image: url('/images/background/land.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center bottom;
      width: 100%;
      height: 100%;
      box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
        0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
      display: grid;
      place-items: center;
    }
  }
  &.desktop {
    width: calc(100% - ${NAVBAR_WIDTH}px);
    left: ${NAVBAR_WIDTH}px;
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slider = ({ photos, pageIndex, innerWidth, ...props }) => {
  const { withLayout, setIndex } = React.useContext(AppContext);
  const index = React.useRef(pageIndex);
  const [springs, setSprings] = useSprings(photos.length, (i) => ({
    x: (i - index.current) * innerWidth,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(
    ({ touches, down, offset: [x], lastOffset: [lastX], cancel }) => {
      const deltaX = x - lastX;
      if (touches > 1) cancel();
      if (down && Math.abs(deltaX) > innerWidth / 3) {
        if (deltaX < 0 && index.current < photos.length - 1) {
          index.current += 1;
        } else if (deltaX > 0 && index.current > 0) {
          index.current -= 1;
        }
        setIndex(index.current + 1);
        cancel();
      }
      setSprings((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: 'none' };
        const xT = (i - index.current) * innerWidth + (down ? deltaX : 0);
        const scaleT = down ? 1 - Math.abs(deltaX) / innerWidth / 4 : 1;
        return { x: xT, scale: scaleT, display: 'block' };
      });
    },
  );

  const moveSprings = React.useCallback(() => {
    setSprings((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const xT = (i - index.current) * innerWidth;
      return { x: xT, display: 'block' };
    });
  }, [innerWidth, setSprings]);
  const handleRight = React.useCallback(() => {
    if (index.current < photos.length - 1) {
      index.current += 1;
      setIndex(index.current + 1);
      moveSprings();
    }
  }, [moveSprings, setIndex, photos.length]);
  const handleLeft = React.useCallback(() => {
    if (index.current > 0) {
      index.current -= 1;
      setIndex(index.current + 1);
      moveSprings();
    }
  }, [moveSprings, setIndex]);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') handleRight();
      if (e.key === 'ArrowLeft') handleLeft();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleLeft, handleRight]);

  return (
    <Root className={`unselectable ${withLayout ? 'desktop' : ''}`} {...props}>
      {springs.map(({ x, display, scale }, i) => (
        <animated.div
          {...bind()}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={{
            display,
            transform: x.interpolate((xT) => `translate3d(${xT}px,0,0)`),
          }}>
          <animated.div
            style={{
              transform: scale.interpolate((s) => `scale(${s})`),
            }}>
            index: {i + 1}
          </animated.div>
        </animated.div>
      ))}
    </Root>
  );
};

export default Slider;
