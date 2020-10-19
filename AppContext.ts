import React from 'react';

interface ContextProps {
  index: number;
  setIndex: (newIndex: number) => void;
  withLayout: boolean;
}

const defaultContext: ContextProps = {
  index: 0,
  setIndex: () => {},
  withLayout: false,
};

export default React.createContext<ContextProps>(defaultContext);
