import React from 'react';
// import Image from 'next/image';
import styled from 'styled-components';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import AppContext from '../../AppContext';

const Root = styled.div`
  .keen-photo {
    width: 100%;
    height: 65vw;
    object-fit: cover;
    border-radius: 5px;
  }
  &.desktop {
    .keen-photo {
      height: 16vw;
    }
  }
`;

interface props {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}
const KeenSlider: React.FC<props> = ({
  images,
  autoPlay = false,
  interval = 3000,
  ...props
}) => {
  const { withLayout } = React.useContext(AppContext);
  const [pause, setPause] = React.useState<boolean>(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: !withLayout ? 1.25 : 3.5,
    spacing: 16,
    mode: 'snap',
    centered: true,
    loop: true,
    duration: 500,
    dragStart: () => setPause(true),
    dragEnd: () => setPause(false),
  });

  React.useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('mouseover', () => {
        setPause(true);
      });
      sliderRef.current.addEventListener('mouseover', () => {
        setPause(false);
      });
    }
  }, [sliderRef]);

  const startTimer = React.useCallback(() => {
    timer.current = setInterval(() => slider.next(), interval);
  }, [slider, interval]);

  const endTimer = React.useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!autoPlay || !pause) {
      endTimer();
    }
    if (autoPlay && !pause) {
      startTimer();
    }
    return () => endTimer();
  }, [autoPlay, startTimer, endTimer, pause]);

  return (
    <Root
      ref={sliderRef as never}
      className={`keen-slider ${withLayout && 'desktop'}`}
      {...props}>
      {images.map((image) => (
        <div key={image} className="keen-slider__slide">
          <img alt="" className="keen-photo" src={image} />
        </div>
      ))}
    </Root>
  );
};

export default KeenSlider;
