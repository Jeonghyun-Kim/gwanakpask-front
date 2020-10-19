/* eslint-disable no-console */
export const saveIndex: (index: number) => void = (index) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem('@index', `${index}`);
  } else {
    console.error('window not defined!');
  }
};

export const getIndex: () => number | null = () => {
  if (typeof window !== 'undefined') {
    const value = window.sessionStorage.getItem('@index');
    if (value === null) return value;
    return Number(value);
  }
  console.error('window not defined!');
  return null;
};

export default { saveIndex, getIndex };
