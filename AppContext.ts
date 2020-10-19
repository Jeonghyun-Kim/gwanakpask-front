import { createContext } from 'react';

interface ContextProps {
  index: number;
  setIndex: (newIndex: number) => void;
  headerOpen: boolean;
  setHeaderOpen: (open: boolean) => void;
  withLayout: boolean;
}

const defaultContext: ContextProps = {
  index: 0,
  setIndex: () => {},
  headerOpen: true,
  setHeaderOpen: () => {},
  withLayout: false,
};

export default createContext<ContextProps>(defaultContext);
