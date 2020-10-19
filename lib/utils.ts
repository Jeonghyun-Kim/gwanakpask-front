/* eslint-disable no-console */
import Router from 'next/router';
import * as uuid from 'uuid';
import { deviceDetect } from 'react-device-detect';
import moment from 'moment-timezone';

export const timestamp: () => string = () => {
  return moment.tz(new Date(), 'Asia/Seoul').format();
};

export const timeFormat: (date: Date) => string = (date) => {
  return moment.tz(String(date), 'Asia/Seoul').format('YYYY/MM/DD hh:mm A');
};

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

export const pageCounter: () => void = () => {
  const asPath = sessionStorage.getItem('@path');
  if (asPath && asPath === Router.asPath) return;
  const userId = getUserId();
  fetch('/api/counter/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json ',
    },
    body: JSON.stringify({ userId, asPath: Router.asPath }),
  }).then(() => sessionStorage.setItem('@path', Router.asPath));
};

export default {
  timestamp,
  timeFormat,
  saveIndex,
  getIndex,
  getUserId,
  pageCounter,
};
