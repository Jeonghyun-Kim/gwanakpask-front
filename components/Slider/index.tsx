import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSpring, useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Gradient from '../Gradient';

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
      .close-button {
        position: absolute;
        top: 10px;
        left: 5px;
        padding: 5px;
        svg {
          font-size: 36px;
          color: white;
        }
      }
      .photo {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 40% auto;
        max-width: min(500px, 100% - 40px);
        max-height: 60%;
        width: auto;
        height: auto;
        object-fit: contain;
        box-shadow: rgba(0, 20, 0, 0.2) 10px 7px 10px 3px;
        border-radius: 1px;
      }
      .bottom {
        padding: 0 16px 24px 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .artist-info {
          display: flex;
          align-items: flex-end;
          .title-and-name {
            margin-left: 10px;
            h2 {
              margin: 5px 0;
              font-size: 1rem;
              font-weight: 500;
              color: white;
            }
            p {
              margin: 0;
              font-size: 0.75rem;
              font-weight: 400;
              color: white;
            }
          }
        }
        .icon-block {
          display: flex;
          flex-direction: column;
          svg {
            font-size: 2rem;
            color: white;
          }
          .icon-name {
            font-size: 0.625rem;
            font-weight: 400;
            color: white;
            text-align: center;
          }
        }
      }
    }
  }
  &.desktop {
    width: calc(100% - ${NAVBAR_WIDTH}px);
    left: ${NAVBAR_WIDTH}px;
  }
`;

interface props {
  photos: PhotoWithArtist[];
  pageIndex: number;
  innerWidth: number;
}
const Slider: React.FC<props> = ({
  photos,
  pageIndex,
  innerWidth,
  ...props
}) => {
  const router = useRouter();
  const { withLayout, setIndex } = React.useContext(AppContext);
  const index = React.useRef(pageIndex);
  const [zoomIn, setZoomIn] = React.useState(false);
  const [springs, setSprings] = useSprings(photos.length, (i) => ({
    x: (i - index.current) * innerWidth,
    scale: 1,
    zIndex: i === pageIndex ? 1 : 'initial',
    display: 'block',
  }));
  const [{ x, y, zoom }, setSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    zoom: 1,
    config: { tension: 250 },
  }));

  const bind = useGesture({
    onDrag: ({
      touches,
      down,
      offset: [xOffset],
      lastOffset: [lastX],
      cancel,
    }) => {
      const deltaX = xOffset - lastX;
      if (down && Math.abs(deltaX) > innerWidth / 3) {
        if (deltaX < 0 && index.current < photos.length - 1) {
          index.current += 1;
        } else if (deltaX > 0 && index.current > 0) {
          index.current -= 1;
        }
        setIndex(index.current + 1);
        if (cancel) cancel();
      }
      if (touches > 1 || zoomIn) {
        if (cancel) cancel();
      } else {
        setSprings((i) => {
          if (i < index.current - 1 || i > index.current + 1)
            return { display: 'none' };
          const xT = (i - index.current) * innerWidth + (down ? deltaX : 0);
          const scaleT = down ? 1 - Math.abs(deltaX) / innerWidth / 4 : 1;
          if (i === index.current)
            return { x: xT, scale: scaleT, zIndex: 1, display: 'block' };
          return { x: xT, scale: scaleT, zIndex: 'initial', display: 'block' };
        });
      }
    },
  });

  const imgBind = useGesture({
    onDrag: ({
      down,
      offset: [xOffset, yOffset],
      lastOffset: [lastX, lastY],
      cancel,
      canceled,
    }) => {
      if (!zoomIn) {
        if (cancel) cancel();
      } else {
        setSpring({
          x: down ? xOffset - lastX : 0,
          y: down ? yOffset - lastY : 0,
        });
      }
      if (canceled) setSpring({ x: 0, y: 0 });
    },
  });

  const moveSprings = React.useCallback(() => {
    setSprings((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const xT = (i - index.current) * innerWidth;
      if (i === index.current)
        return { x: xT, scale: 1, zIndex: 1, display: 'block' };
      return { x: xT, scale: 1, zIndex: 'initial', display: 'block' };
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

  React.useLayoutEffect(() => {
    const handler = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', handler, { passive: false });
    return () => document.removeEventListener('touchstart', handler);
  }, []);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleRight();
      if (e.key === 'ArrowLeft') handleLeft();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleLeft, handleRight]);

  React.useEffect(() => {
    setSpring({ zoom: zoomIn ? 2 : 1 });
  }, [zoomIn, setSpring]);

  return (
    <Root className={`unselectable ${withLayout ? 'desktop' : ''}`} {...props}>
      {springs.map(({ x: xBackground, display, scale, zIndex }, i) => (
        <animated.div
          {...bind()}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={{
            display: display as never,
            zIndex: zIndex as never,
            x: xBackground,
          }}>
          <animated.div style={{ scale }}>
            {!withLayout ? (
              <Gradient
                size={{ width: '100%', height: '70px' }}
                position={{ top: '0', left: '0' }}
                opacities={{ start: 0, end: 0.4 }}
                vertical>
                <IconButton
                  className="close-button"
                  onClick={() => {
                    // if (window.history.length < 2) {
                    router.push('/ovr/list');
                    // } else {
                    //   router.back();
                    // }
                  }}>
                  <CloseIcon />
                </IconButton>
              </Gradient>
            ) : (
              <></>
            )}
            <animated.img
              {...imgBind()}
              style={{
                x,
                y,
                scale: zoom,
              }}
              className="photo"
              alt={photos[i].title}
              src={photos[i].url ?? `/images/photo/full/${i + 1}.jpg`}
            />
            {!withLayout ? (
              <Gradient
                className="bottom"
                size={{ width: '100%', height: '112px' }}
                position={{ bottom: '0', left: '0' }}
                opacities={{ start: 0.5, end: 0 }}
                vertical>
                <div className="artist-info">
                  <div className="icon-block">
                    <PersonIcon />
                    <span className="icon-name">작가</span>
                  </div>
                  <div className="title-and-name">
                    <h2 className="title">{photos[i].title}</h2>
                    <p className="artist-name">{photos[i].artist.name}</p>
                  </div>
                </div>
                <div
                  className="icon-block"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    setZoomIn(!zoomIn);
                    e.currentTarget.blur();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setZoomIn(!zoomIn);
                      e.currentTarget.blur();
                    }
                  }}>
                  <ZoomInIcon />
                  <span className="icon-name">확대</span>
                </div>
              </Gradient>
            ) : (
              <></>
            )}
          </animated.div>
        </animated.div>
      ))}
    </Root>
  );
};

export default Slider;
