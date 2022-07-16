// hello.test.js

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ReviewSummary from './ReviewListEntry/ReviewSummary';
import sampleReviews from './sampleReviews';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with or without a name', () => {
  act(() => {
    render(<ReviewSummary summary={sampleReviews.results[0].summary} />, container);
  });
  expect(container.textContent).toBe("I don't like the model's attitude in the camo pict...");

  act(() => {
    render(<ReviewSummary summary={sampleReviews.results[1].summary} />, container);
  });
  expect(container.textContent).toBe('Wikipedia summary');

  act(() => {
    render(<ReviewSummary summary={sampleReviews.results[4].summary} />, container);
  });
  expect(container.textContent).toBe('Meh Camo');
});
