import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import User from './index';

let testContainer = null;

beforeEach(() => {
  testContainer = document.createElement('div');
  document.body.appendChild(testContainer);
});

afterEach(() => {
  unmountComponentAtNode(testContainer);
  testContainer.remove();
  testContainer = null;
});

it('Fake user Data Json', () => {
  const fakeUserData = {
    name: 'Matheus Carvalho',
    login: 'carvalhobfr',
    avatar_url:
      'https://avatars1.githubusercontent.com/u/21340896?s=460&u=15027961d91563801094b670c063c78397c535a1&v=4',
  };

  act(() => {
    render(
      <User
        name={fakeUserData.name}
        reposQuantity={fakeUserData.reposQuantity}
        picture={fakeUserData.picture}
      />,
      testContainer,
    );
  });
  // expect(testContainer.querySelector('divstrong').textContent).toBe(
  //   fakeUserData.name,
  // );
  // expect(testContainer.querySelector('Link').textContent).toBe(
  //   fakeUserData.login,
  // );
  expect(testContainer.querySelector('img').src).toBe(fakeUserData.avatar_url);
  expect(testContainer.querySelector('img').alt).toBe(fakeUserData.login);
});
