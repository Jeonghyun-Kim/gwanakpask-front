import { useEffect, useRef } from 'react';

const usePrevious: (value: boolean) => boolean | undefined = (value) => {
  const ref = useRef<boolean>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
