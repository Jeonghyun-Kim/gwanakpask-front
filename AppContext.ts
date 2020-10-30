import { createContext } from 'react';

interface ContextProps {
  index: number;
  setIndex: (newIndex: number) => void;
  withLayout: boolean | null;
}

const defaultContext: ContextProps = {
  index: 0,
  setIndex: () => {},
  withLayout: null,
};

export default createContext<ContextProps>(defaultContext);
