import { useState, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const useLayout: () => { withLayout: boolean } = () => {
  const [withLayout, setLayout] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      setLayout(
        window.innerWidth > 751 &&
          (!isMobile || (isTablet && window.innerWidth > window.innerHeight)),
      );
    };
    window.addEventListener('resize', handler, {
      capture: false,
      passive: true,
    });
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);

  return { withLayout };
};

export default useLayout;
