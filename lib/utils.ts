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
  window.sessionStorage.setItem('@index', `${index}`);
};

export const getIndex: () => number | null = () => {
  const value = window.sessionStorage.getItem('@index');
  if (value === null) return value;
  return Number(value);
};

export const getUserId: () => string = () => {
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

export const photoCounter: (photoId: number) => void = (photoId) => {
  fetch('/api/counter/photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json ',
    },
    body: JSON.stringify({ photoId }),
  });
};

export default {
  timestamp,
  timeFormat,
  saveIndex,
  getIndex,
  getUserId,
  pageCounter,
  photoCounter,
};
