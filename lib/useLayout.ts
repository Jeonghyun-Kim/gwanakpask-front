import { useState, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}

const useLayout: () => { withLayout: boolean; size: WindowSize } = () => {
  const [withLayout, setLayout] = useState<boolean>(false);
  const [size, setSize] = useState<WindowSize>({
    innerWidth: 0,
    innerHeight: 0,
  });

  useEffect(() => {
    const handler = () => {
      const { innerWidth, innerHeight } = window;
      setLayout(
        innerWidth > 751 &&
          (!isMobile || (isTablet && innerWidth > innerHeight)),
      );
      setSize({ innerWidth, innerHeight });
    };
    window.addEventListener('resize', handler, {
      capture: false,
      passive: true,
    });
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);

  return { withLayout, size };
};

export default useLayout;
