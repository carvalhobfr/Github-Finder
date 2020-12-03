import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

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

it('should return Repo JSON', () => {
  const fakeData = {
    name: 'goBarber',
    description: 'An app for barber appointment and scheduling.',
    full_name: 'carvalhobfr/goBarber',
  };

  act(() => {
    render(
      <a key={fakeData.id} href={fakeData.html_url}>
        <div>
          <strong>{fakeData.name}</strong>
          <p>{fakeData.description || null}</p>
          <h5>{fakeData.full_name}</h5>
        </div>
      </a>,
      testContainer,
    );
  });

  expect(testContainer.querySelector('strong').textContent).toBe(fakeData.name);
  expect(testContainer.querySelector('p').textContent).toBe(
    fakeData.description,
  );
  expect(testContainer.querySelector('h5').textContent).toBe(
    fakeData.full_name,
  );
});
