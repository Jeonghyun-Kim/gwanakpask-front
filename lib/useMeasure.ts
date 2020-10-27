/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, MutableRefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface Bound {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

const defaultBound: Bound = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};

const useMeasure: () => [{ ref: MutableRefObject<any> }, Bound] = () => {
  const ref = useRef<any>();
  const [bounds, set] = useState<Bound>(defaultBound);
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, bounds];
};

export default useMeasure;
