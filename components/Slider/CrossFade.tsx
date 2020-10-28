import React from 'react';
import styled from 'styled-components';
import { useSprings } from '@react-spring/core';
import { a } from '@react-spring/web';
import { useHover } from 'react-use-gesture';

const Root = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
  display: grid;
  place-items: center;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DarkBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1;
`;

interface props {
  images: string[];
  timeout: number;
  height?: string;
  children?: React.ReactNode;
}
const CrossFadeSlider: React.FC<props> = ({
  images,
  timeout,
  height = '100%',
  children,
  ...props
}) => {
  const [pause, setPause] = React.useState<boolean>(false);
  const index = React.useRef<number>(0);
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const [springs, setSprings] = useSprings(
    images.length,
    (i) => ({
      opacity: i === index.current ? 1 : 0,
    }),
    [],
  );

  const bind = useHover(({ active }) => {
    if (active) setPause(true);
    else setPause(false);
  });

  const handleNext = React.useCallback(() => {
    index.current = (index.current + 1) % images.length;
    setSprings((i) => ({
      opacity: i === index.current ? 1 : 0,
    }));
  }, [images.length, setSprings]);

  const startTimer = React.useCallback(() => {
    timer.current = setInterval(() => handleNext(), timeout);
  }, [timeout, handleNext]);

  const endTimer = React.useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (pause && timer.current) {
      endTimer();
    }
    if (!pause && timer.current) {
      startTimer();
    }
    return () => endTimer();
  }, [pause, startTimer, endTimer]);

  return (
    <Root height={height} {...bind()} {...props}>
      <DarkBackground />
      {springs.map(({ opacity }, i) => (
        <a.img
          key={images[i]}
          style={{ opacity: opacity as never }}
          alt=""
          src={images[i]}
        />
      ))}
      {children}
    </Root>
  );
};

export default CrossFadeSlider;
