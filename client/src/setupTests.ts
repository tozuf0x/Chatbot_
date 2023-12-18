/* eslint-disable */
import '@testing-library/jest-dom';
import { ReactNode } from 'react';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

jest.mock('react-helmet-async', () => {
  const React = require('react');
  const plugin = jest.requireActual('react-helmet-async');

  const mockHelmet = ({
    children,
    ...props
  }: {
    children: ReactNode;
    props: Object;
  }) =>
    React.createElement(
      'div',
      {
        ...props,
        className: 'mock-helmet',
      },
      children
    );

  return {
    ...plugin,
    Helmet: jest.fn().mockImplementation(mockHelmet),
  };
});
