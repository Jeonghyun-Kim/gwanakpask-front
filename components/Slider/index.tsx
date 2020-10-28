import React from 'react';
import { useRouter } from 'next/router';
import { useSprings } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowLeft from '../../public/icons/arrow_left.svg';
import ArrowRight from '../../public/icons/arrow_right.svg';
import Photo from './Photo';
import Gradient from '../Gradient';
import Profile from './Profile';
import { EdgeModal } from '../Modal';

import { MobileRoot, DesktopRoot } from './styles';

import usePrevious from '../../lib/hooks/usePrevious';

import AppContext from '../../AppContext';
import { getArtistWithPhotos } from '../../data';

const zoomScales = [1, 2];

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
  const index = React.useRef<number>(pageIndex);
  const pinchFlag = React.useRef<boolean>(false);
  const [zoomIn, setZoomIn] = React.useState<number>(0);
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
  const previousProfileOpen = usePrevious(profileOpen);
  const [edgeModalFlag, setEdgeModalFlag] = React.useState<boolean>(false);
  const [springs, setSprings] = useSprings(
    photos.length,
    (i) => ({
      x: (i - index.current) * innerWidth,
      scale: 1,
      zIndex: i === index.current ? 1 : 0,
      display: 'block',
      config: { tension: 500, friction: 50 },
    }),
    [],
  );

  const moveSprings = React.useCallback(() => {
    setSprings((i) => {
      if (i < index.current - 1 || i > index.current + 1)
        return { display: 'none' };
      const x = (i - index.current) * innerWidth;
      if (i === index.current)
        return { x, scale: 1, zIndex: 1, display: 'block' };
      return { x, scale: 1, zIndex: 0, display: 'block' };
    });
  }, [innerWidth, setSprings]);

  const handleRight = React.useCallback(() => {
    if (index.current < photos.length - 1) {
      if (profileOpen) setProfileOpen(false);
      index.current += 1;
      setIndex(index.current + 1);
      if (!withLayout) moveSprings();
    } else if (index.current === photos.length - 1) {
      setEdgeModalFlag(true);
    }
  }, [moveSprings, setIndex, profileOpen, photos.length, withLayout]);

  const handleLeft = React.useCallback(() => {
    if (index.current > 0) {
      if (profileOpen) setProfileOpen(false);
      index.current -= 1;
      setIndex(index.current + 1);
      if (!withLayout) moveSprings();
    }
  }, [moveSprings, setIndex, profileOpen, withLayout]);

  const handleGoTo = React.useCallback(
    (photoId: number) => {
      index.current = photoId - 1;
      setIndex(photoId - 1);
      if (!withLayout) moveSprings();
    },
    [moveSprings, setIndex, withLayout],
  );

  const bind = useGesture({
    onDrag: ({
      last,
      touches,
      down,
      offset: [x],
      lastOffset: [lastX],
      velocities: [vx],
      cancel,
      swipe: [, sy],
    }) => {
      if (sy === -1) {
        setProfileOpen(true);
        if (cancel) cancel();
      }
      if (touches > 1 || zoomIn) {
        if (cancel) cancel();
      } else {
        const deltaX = x - lastX;
        setSprings((i) => {
          if (i < index.current - 1 || i > index.current + 1)
            return { display: 'none' };
          const xT = (i - index.current) * innerWidth + (down ? deltaX : 0);
          const scale =
            down && touches === 1 ? 1 - Math.abs(deltaX) / innerWidth / 10 : 1;
          if (i === index.current)
            return { x: xT, scale, zIndex: 1, display: 'block' };
          return { x: xT, scale, zIndex: 0, display: 'block' };
        });
        if (last && (Math.abs(deltaX) > innerWidth / 3 || Math.abs(vx) > 1)) {
          if (deltaX < 0) handleRight();
          else handleLeft();
        }
      }
    },
    onPinch: ({ first, last, da: [d], vdva: [vd], cancel }) => {
      if (first) pinchFlag.current = true;
      if (last) pinchFlag.current = false;
      if (
        pinchFlag.current &&
        zoomIn < zoomScales.length - 1 &&
        vd > 0.3 &&
        (d > 100 || vd > 1)
      ) {
        pinchFlag.current = false;
        setZoomIn(zoomIn + 1);
        if (cancel) cancel();
      } else if (pinchFlag.current && zoomIn > 0 && vd < 0) {
        pinchFlag.current = false;
        setZoomIn(0);
        if (cancel) cancel();
      }
    },
    onClick: () => {
      if (profileOpen) setProfileOpen(false);
    },
    onDoubleClick: () => {
      setZoomIn(zoomIn ? 0 : 1);
    },
  });

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
      if (e.key === 'Escape') {
        if (profileOpen) {
          setProfileOpen(false);
        } else {
          router.push('/ovr/list');
        }
      }
      if (e.key === 'P' || e.key === 'p') setProfileOpen(!profileOpen);
      if (e.key === ' ') {
        e.preventDefault();
        setZoomIn(zoomIn ? 0 : 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleLeft, handleRight, router, profileOpen, zoomIn]);

  const CloseButton: React.FC = React.useCallback(
    () => (
      <IconButton
        className="close-button"
        onClick={() => router.push('/ovr/list')}>
        <CloseIcon />
      </IconButton>
    ),
    [router],
  );

  const ArtistInfo: React.FC<{
    i: number;
    children?: React.ReactNode;
  }> = React.useCallback(
    ({ i, children }) => (
      <div className="artist-info">
        <div
          className="click-area"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            setProfileOpen(!profileOpen);
            e.currentTarget.blur();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setProfileOpen(!profileOpen);
              e.currentTarget.blur();
            }
          }}>
          <div className="icon-block">
            <PersonIcon />
            <span className="icon-name">작가</span>
          </div>
          <div className="vertical-divider" />
          <div className="title-and-name">
            <h2 className="title">{photos[i].title}</h2>
            <p className="artist-name">{photos[i].artist.name}</p>
          </div>
        </div>
        {children}
      </div>
    ),
    [photos, profileOpen],
  );

  const ZoomInButton: React.FC = React.useCallback(
    () => (
      <div className="zoom-in-button">
        <div
          className="icon-block"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            setZoomIn(zoomIn ? 0 : 1);
            e.currentTarget.blur();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setZoomIn(zoomIn ? 0 : 1);
              e.currentTarget.blur();
            }
          }}>
          {zoomIn ? <ZoomOutIcon /> : <ZoomInIcon />}
          <span className="icon-name">{zoomIn ? '축소' : '확대'}</span>
        </div>
      </div>
    ),
    [zoomIn],
  );

  const Gradients: React.FC = React.useCallback(
    () => (
      <>
        <Gradient
          size={{ width: '100%', height: '70px' }}
          position={{ top: '0', left: '0' }}
          opacities={{ start: 0, end: 0.4 }}
          vertical
        />
        <Gradient
          className="bottom"
          size={{ width: '100%', height: '112px' }}
          position={{ bottom: '0', left: '0' }}
          opacities={{ start: 0.5, end: 0 }}
          vertical
        />
      </>
    ),
    [],
  );

  const Arrows: React.FC = React.useCallback(
    () => (
      <>
        <IconButton className="arrow-button left" onClick={() => handleLeft()}>
          <SvgIcon component={ArrowLeft} viewBox="6 6 12 12" />
        </IconButton>
        <IconButton
          className="arrow-button right"
          onClick={() => handleRight()}>
          <SvgIcon component={ArrowRight} viewBox="6 6 12 12" />
        </IconButton>
      </>
    ),
    [handleLeft, handleRight],
  );

  return (
    <>
      <EdgeModal open={edgeModalFlag} />
      {!withLayout ? (
        <MobileRoot className="unselectable" {...props}>
          <>
            {springs.map(({ x, display, scale, zIndex }, i) => (
              <a.div
                className="slider-page"
                {...bind()}
                key={`background-${photos[i].photoId}`}
                style={{
                  x,
                  display: display as never,
                  zIndex: zIndex as never,
                }}>
                <a.div style={{ scale }}>
                  <Photo
                    title={photos[i].title}
                    src={
                      photos[i].url ??
                      `/images/photo/full/${photos[i].photoId}.jpg`
                    }
                    zoomScales={zoomScales}
                    zoomIn={zoomIn}
                    innerWidth={innerWidth}
                  />
                  <Gradients />
                  <CloseButton />
                  <ArtistInfo i={i} />
                  <ZoomInButton />
                </a.div>
              </a.div>
            ))}
            <Profile
              open={profileOpen}
              previous={previousProfileOpen}
              close={() => setProfileOpen(false)}
              artist={getArtistWithPhotos(photos[pageIndex].artist.artistId)}
              handleGoTo={handleGoTo}
            />
          </>
        </MobileRoot>
      ) : (
        <DesktopRoot className="unselectable" {...props}>
          <Photo
            title={photos[pageIndex].title}
            src={
              photos[pageIndex].url ??
              `/images/photo/full/${photos[pageIndex].photoId}.jpg`
            }
            zoomScales={zoomScales}
            zoomIn={zoomIn}
            innerWidth={innerWidth}
          />
          <CloseButton />
          <Arrows />
          <ArtistInfo i={pageIndex}>
            <Profile
              open={profileOpen}
              previous={previousProfileOpen}
              close={() => setProfileOpen(false)}
              artist={getArtistWithPhotos(photos[pageIndex].artist.artistId)}
              handleGoTo={setIndex}
            />
          </ArtistInfo>
          <ZoomInButton />
        </DesktopRoot>
      )}
    </>
  );
};

export default Slider;
