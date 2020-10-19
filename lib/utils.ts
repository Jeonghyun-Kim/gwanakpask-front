import * as uuid from 'uuid';
import { deviceDetect } from 'react-device-detect';

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

export const getUserId: () => string = () => {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem('@userId');
    if (value) return value;
    const userId = uuid.v4();
    fetch('/api/counter/visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, deviceInfo: deviceDetect() }),
    });
    window.localStorage.setItem('@userId', userId);
    return userId;
  }
  console.error('window not defined!');
  return '';
};

export default { saveIndex, getIndex, getUserId };
