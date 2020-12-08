import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import User from './index';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('user informations', () => {
  const fakeUser = {
    name: 'Matheus Carvalho',
    reposQuantity: '61',
    picture: 'https://github.com/carvalhobfr.png',
  };

  act(() => {
    render(
      <User
        name={fakeUser.name}
        reposQuantity={fakeUser.reposQuantity}
        picture={fakeUser.picture}
      />,
      container,
    );
  });
  // expect(container.querySelector('div>div>img').src).toBe(fakeUser.picture);
  // expect(container.querySelector('strong').textContent).toBe(fakeUser.name);
  console.log(container);
  // expect(container.querySelector('span').textContent).toBe(
  //   fakeUser.reposQuantity,
  // );
});
