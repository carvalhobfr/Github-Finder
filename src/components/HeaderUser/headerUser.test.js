import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import HeaderUser from './index';

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

it('fakeUser Render Test', () => {
  const fakeUser = {
    name: 'Matheus',
    bio: 'fake bio, hello!',
    login: '@carvalhobfr',
    avatar_url: 'https://avatars3.githubusercontent.com/u/21340896?v=4',
    followers: 100,
    following: 100,
    public_repos: 100,
  };
  act(() => {
    render(
      <HeaderUser
        name={fakeUser.name}
        bio={fakeUser.bio}
        login={fakeUser.login}
        avatar_url={fakeUser.avatar_url}
        followers={fakeUser.followers}
        following={fakeUser.following}
        public_repos={fakeUser.public_repos}
      />,
      container,
    );
  });
  expect(container.querySelector('h1').textContent).toBe(fakeUser.name);
  expect(container.querySelector('h5').textContent).toBe(`@${fakeUser.login}`);
  expect(container.querySelector('strong').textContent).toBe(fakeUser.bio);
  expect(container.querySelector('img').src).toBe(fakeUser.avatar_url);
  expect(parseInt(container.querySelector('li>strong').textContent)).toBe(
    fakeUser.followers,
  );
  expect(parseInt(container.querySelector('li>strong').textContent)).toBe(
    fakeUser.followers,
  );
  expect(
    parseInt(container.querySelector('li:nth-child(2)>strong').textContent),
  ).toBe(fakeUser.following);
  expect(
    parseInt(container.querySelector('li:nth-child(3)>strong').textContent),
  ).toBe(fakeUser.public_repos);
});
