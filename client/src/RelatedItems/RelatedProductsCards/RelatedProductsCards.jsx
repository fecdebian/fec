/** @jsx jsx */
import { useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { css, jsx } from '@emotion/react';

import ProductCard from './ProductCard';
import currentProductState from '../../currentProduct';
import relatedProductsState from '../ModelRelatedItems/relatedProductsState';

export default function RelatedProductsCards() {
  const currentProduct = useRecoilValue(currentProductState);
  const [relatedProducts, setRelatedProducts] = useRecoilState(relatedProductsState);
  const myRef = useRef(null);

  const scrollRightHandler = (e) => {
    e.preventDefault();
    console.log(myRef.current.scrollLeft);
    myRef.current.scrollLeft += 200;
  };

  useEffect(() => {
    const relatedProductsRequests = [];
    axios({
      method: 'get',
      url: `/products/${currentProduct.id}/related`,
      params: { product_id: currentProduct.id },
    }).then((res) => {
      res.data.forEach((id) => {
        // console.log('id ', id);
        relatedProductsRequests.push(
          axios({
            method: 'get',
            url: `/products/${id}`,
          }),
        );
      });
      return Promise.all(relatedProductsRequests);
    }).then((products) => {
      const relatedProductsCopy = [];
      products.forEach((product) => {
        relatedProductsCopy.push(product.data);
      });
      setRelatedProducts(relatedProductsCopy);
    }).catch((err) => {
      console.log('Unable to get related product id from server ', err);
    });

    // const container = document.querySelector('#related-Products-slider');
    // const container = document.getElementById('related-Products-slider');

    // console.log(container);
    // container.addEventListener('scroll', scrollRightHandler);
    // return () => {
    //   container.removeEventListener('scroll', scrollRightHandler);
    // };
  }, []);

  if (relatedProducts.length === 0) {
    return <div>Products Card Loading...</div>;
  }

  return (
    <div>
      <h2>More in related products</h2>
      <div
        css={css`
          border-sizing: border-box;
          display:flex;
          justify-content:center;
          width:100%;
          border:solid;
    `}>
        <button
          type="button"
          css={css`
          border-sizing: border-box;
          width:5%;
          z-index:10;
          background-color: rgba(0,0,0,0.25);
          display:flex;
          justify-content:center;
          align-items:center;
          color:white;
          font-size:5rem;
          border:solid;`}
        >
          &#8249;
        </button>
        <div
          ref={myRef}
          id="related-Products-slider"
          css={css`
          border-sizing: border-box;
          display:flex;
          width:90%;
          border:dotted;
          overflow:scroll;
        `}
        >
          {relatedProducts.map(
            (product) => (
              <div
                key={product.id}
                css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  border:solid;
            `}>
                <ProductCard product={product} />
              </div>
            ),
          )}
          {/* test css */}
          {relatedProducts.map(
            (product) => (
              <div
                key={product.id}
                css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  border:solid;
            `}>
                <ProductCard product={product} />
              </div>
            ),
          )}
          {relatedProducts.map(
            (product) => (
              <div
                key={product.id}
                css={css`
                  flex: 0 0 14%;
                  border-sizing: border-box;
                  width:14%;
                  padding:0.25rem;
                  border:solid;
            `}>
                <ProductCard product={product} />
              </div>
            ),
          )}

        </div>
        {/* left handler */}
        <button
          onClick={scrollRightHandler}
          type="button"
          css={css`
            border-sizing: border-box;
            width:5%;
            z-index:10;
            background-color: rgba(0,0,0,0.25);
            display:flex;
            justify-content:center;
            align-items:center;
            color:white;
            font-size:5rem;
            border:solid;`}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
