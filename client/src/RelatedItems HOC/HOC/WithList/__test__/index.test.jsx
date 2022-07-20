import '@testing-library/jest-dom';
import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import withList from '../index';

const placeHolder = 'PlaceHolder';
const placeHolders = [];
for (let i = 0; i < 20; i += 1) {
  placeHolders.push(placeHolder + i);
}

function Products() {
  return (
    <>
      {placeHolders.map((item) => <div key={item}>{item}</div>)}
    </>
  );
}

afterEach(cleanup);

test('should render component', async () => {
  const List = withList(Products);
  render(<List currentProductDetail={{}} />);
  const SlideELement = screen.getByTestId('sliderContainer');
  expect(SlideELement).toBeInTheDocument();
});
