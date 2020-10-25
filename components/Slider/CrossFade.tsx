import React from 'react';
import styled from 'styled-components';
import { useSprings } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useHover } from 'react-use-gesture';

const Root = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface props {
  images: string[];
  timeout: number;
  height?: string;
}
const CrossFadeSlider: React.FC<props> = ({
  images,
  timeout,
  height = '100%',
  ...props
}) => {
  const [pause, setPause] = React.useState<boolean>(false);
  const index = React.useRef<number>(0);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [springs, setSprings] = useSprings(
    images.length,
    (i) => ({
      opacity: i === index.current ? 1 : 0,
    }),
    [],
  );

  const handleNext = React.useCallback(() => {
    index.current = (index.current + 1) % images.length;
    setSprings((i) => ({
      opacity: i === index.current ? 1 : 0,
    }));
  }, [images.length, setSprings]);

  const bind = useHover(({ active }) => {
    if (active) setPause(true);
    else setPause(false);
  });

  const startTimer = React.useCallback(() => {
    setTimer(setInterval(() => handleNext(), timeout));
  }, [timeout, handleNext]);

  const endTimer = React.useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [timer]);

  React.useEffect(() => {
    if (pause && timer) {
      endTimer();
      // console.log('pause timer');
    }
    if (!pause && !timer) {
      startTimer();
      // console.log('start timer');
    }
  }, [pause, timer, startTimer, endTimer]);

  return (
    <Root height={height} {...bind()} {...props}>
      {springs.map(({ opacity }, i) => (
        <a.img
          key={images[i]}
          style={{ opacity: opacity as never }}
          alt=""
          src={images[i]}
        />
      ))}
    </Root>
  );
};

export default CrossFadeSlider;
