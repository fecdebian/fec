// hello.test.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
// import TestRenderer from 'react-test-renderer';

import ReviewSummary from './ReviewListEntry/ReviewSummary';
// import sampleReviews from './sampleReviews';

let container = null;
let root;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  root = createRoot(container);
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  // unmountComponentAtNode(container);
  root.unmount();
  container.remove();
  container = null;
});

it('renders with or without a name', () => {
  act(() => {
    root.render(<ReviewSummary summary={sampleReviews.results[0].summary} />);
  });
  expect(container.textContent).toBe("I don't like the model's attitude in the camo pict...");

  act(() => {
    root.render(<ReviewSummary summary={sampleReviews.results[1].summary} />);
  });
  expect(container.textContent).toBe('Wikipedia summary');

  act(() => {
    root.render(<ReviewSummary summary={sampleReviews.results[4].summary} />);
  });
  expect(container.textContent).toBe('Meh Camo');
});
