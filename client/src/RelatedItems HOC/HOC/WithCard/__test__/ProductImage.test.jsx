import '@testing-library/jest-dom';
import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import axios from 'axios';

import ProductImage from '../ProductImage';

const product = {
  id: 37311,
  campus: 'hr-rfe',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  created_at: '2021-08-13T14:37:33.145Z',
  updated_at: '2021-08-13T14:37:33.145Z',
};
jest.mock('axios');


afterEach(cleanup);

describe('Product Image Component', () => {
  // test('should render Loading...', () => {

  //   render(<ProductImage currentProduct={product} />);
  //   const imagElement = screen.getByText('Loading...');
  //   expect(imagElement).toBeInTheDocument();
  // });

  // test('should render Error', async () => {
  //   render(<ProductImage currentProduct={product} />);
  //   const imagElement = await screen.findByText(/Error:/);
  //   expect(imagElement).toBeInTheDocument();
  // });

  test('should render Image', async () => {
    // axios.get.mockResolvedValue({
    //   data: [
    //     {
    //       product_id: '37311',
    //       results: [
    //         {
    //           style_id: 220998,
    //           name: 'Forest Green & Black',
    //           original_price: '140.00',
    //           sale_price: null,
    //           'default?': true,
    //           photos: [
    //             {
    //               thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    //               url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });

    axios.get.mockImplementationOnce(() => Promise.resolve({
      data:
        {
          product_id: '37311',
          results: [
            {
              style_id: 220998,
              name: 'Forest Green & Black',
              original_price: '140.00',
              sale_price: null,
              'default?': true,
              photos: [
                {
                  thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                  url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
                },
              ],
            },
          ],
        },
      // ],
    }),
    );
    render(<ProductImage currentProduct={product} />);
    const imagElement = await screen.findByAltText(product.name);
    expect(imagElement).toBeInTheDocument();
  });
});
