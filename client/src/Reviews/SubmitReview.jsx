/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import currentProductState from '../currentProduct';

export default function AddReview({ handleExit }) {
  const [reviewsForm, setReviewsForm] = useState(false);
  const product = useRecoilValue(currentProductState);
  const [bodyChars, setBodyChars] = useState('');
  const [recommended, setRecommended] = useState('recommend');
  const [size, setSize] = useState('None selected');
  const [starReview, setStarReview] = useState(0);
  const [invalidInput, setInvalidInput] = useState('');

  function handleSubmitForm(e) {
    e.preventDefault();
    const validEmail = /^\S+@\S+\.\S+$/;
    if (bodyChars.length === 0) {
      setInvalidInput('Error: Must include a review.');
      return;
    }
    if (e.target.nickname.value.length === 0) {
      setInvalidInput('Error: Must include a nickname.');
      return;
    }
    if (e.target.email.value.length === 0) {
      setInvalidInput('Error: Must include an email.');
      return;
    }
    if (bodyChars.length < 50) {
      setInvalidInput('Error: Must put at least 50 characters in body.');
      return;
    }
    if (!validEmail.test(e.target.email.value)) {
      e.target.email.value = '';
      setInvalidInput('Error: must provide a valid email.');
      return;
    }
    axios({
      method: 'post',
      url: '/reviews/',
      data: {
        product_id: product.id,
        rating: starReview,
        summary: e.target.summary.value,
        body: e.target.body.value,
        recommend: recommended,
        name: e.target.nickname.value,
        characteristics: size,
        photos: e.target.photos.value,
        email: e.target.email.value,
      },
    }).catch((err) => {
      console.error('error posting Review: ', err);
    });
    setReviewsForm(!reviewsForm);
    console.log(reviewsForm);
    console.log(e.target);
  }

  function handleClose(e) {
    e.preventDefault();
    setReviewsForm(!reviewsForm);
    handleSubmitForm(e);
    console.log(e.target);
  }

  function handleRecommendedChange(e) {
    setRecommended(e.target.value);
  }

  function handleSizeChange(e) {
    setSize(e.target.value);
  }

  function handleStarReviewChange(e) {
    setStarReview(e.target.value);
  }

  return (
    <div
      className={reviewsForm ? 'modal display-block' : 'modal display-none'}
      css={css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width:100%;
      height: 500px;
      background: rgba(0, 0, 0, 0.6);
      overflow: auto;
    }

    .modal-main {
      position:fixed;
      background: white;
      width: 50%;
      height: 500px;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      border: solid black 2px;
      text-align: center;
      white-space: normal;
      word-wrap: break-word;
      overflow: auto;
    }

    .display-block {
      display: block;
    }

    .error {
      color: red;
    }

    input[type="text"] {
      width: 80%;
    }

    textarea {
      width: 80%;
    }

    input[type="submit"] {
      white-space: normal;
      word-wrap: break-word;
    }

    .exit {
      float: right;
      margin: 5px;
    }

    .display-none {
      display: none;
    }

    .star-rating {
      display: flex;
      align-items: center;
      width: 160px;
      flex-direction: row-reverse;
      justify-content: space-between;
      margin: 40px auto;
      position: relative;
    }

    .star-rating input {
      display: none;
    }

    .star-rating > label {
      width: 30px;
      height: 30px;
      font-family: Arial;
      font-size: 30px;
      transition: 0.2s ease;
      color: orange;
    }

    .star-rating label:hover {
      color: #ff69b4;
      transition: 0.2s ease;
    }

    .star-rating label:active::before {
      transform:scale(1.1);
    }

    .star-rating label::before {
      content: '\\2606';
      position: absolute;
      top: 0px;
      line-height: 26px;
    }

    .star-rating input:checked ~ label:before {
      content:'\\2605';
    }
    `}
    >
      <form onSubmit={handleClose} className="modal-main">
        <button onClick={handleExit} className="exit" type="button">X</button>
        <br />
        <h3>Submit a Review</h3>
        {`About The ${product.name}`}
        <br />
        <br />
        <label>
          {'Overall rating* '}
          <div className="star-rating">
            <input
              type="radio"
              name="stars"
              id="star-a"
              value="5"
              onChange={handleStarReviewChange}
              checked={starReview === '5'}
            />
            <label htmlFor="star-a" />
            <input
              type="radio"
              name="stars"
              id="star-b"
              value="4"
              onChange={handleStarReviewChange}
              checked={starReview === '4'}
            />
            <label htmlFor="star-b" />
            <input
              type="radio"
              name="stars"
              id="star-c"
              value="3"
              onChange={handleStarReviewChange}
              checked={starReview === '3'}
            />
            <label htmlFor="star-c" />
            <input
              type="radio"
              name="stars"
              id="star-d"
              value="2"
              onChange={handleStarReviewChange}
              checked={starReview === '2'}
            />
            <label htmlFor="star-d" />
            <input
              type="radio"
              name="stars"
              id="star-e"
              value="1"
              onChange={handleStarReviewChange}
              checked={starReview === '1'}
            />
            <label htmlFor="star-e" />
          </div>
        </label>
        <label>
          {'Do you recommend this product?* '}
          <br />
          <label>
            <input
              name="Yes"
              type="radio"
              value="recommend"
              // id="true"
              onChange={handleRecommendedChange}
              checked={recommended === 'recommend'}
            />
            Yes
          </label>
          <label>
            <input
              name="No"
              type="radio"
              value="notRecommend"
              // id="false"
              onChange={handleRecommendedChange}
              checked={recommended === 'notRecommend'}
            />
            No
          </label>
        </label>
        <br />
        <br />
        <label>
          {'Characteristics* '}
          <fieldset>
            <legend>
              Size
            </legend>
            <p>{`${size}`}</p>
            <div>
              <input
                name="tooSmall"
                type="radio"
                value="tooSmall"
                onChange={handleSizeChange}
                checked={size === 'tooSmall'}
              />
              <label>Too Small</label>
            </div>
            <div>
              <input
                name="halfTooSmall"
                type="radio"
                value="halfTooSmall"
                onChange={handleSizeChange}
                checked={size === 'halfTooSmall'}
              />
              <label>Half Too Small</label>
            </div>
            <div>
              <input
                name="perfect"
                type="radio"
                value="perfect"
                onChange={handleSizeChange}
                checked={size === 'perfect'}
              />
              <label>Perfect!</label>
            </div>
            <div>
              <input
                name="halfTooBig"
                onChange={handleSizeChange}
                checked={size === 'halfTooBig'}
                type="radio"
                value="halfTooBig"
              />
              <label>Half Too Big</label>
            </div>
            <div>
              <input
                name="tooBig"
                type="radio"
                value="tooBig"
                onChange={handleSizeChange}
                checked={size === 'tooBig'}
              />
              <label>Too big</label>
            </div>
          </fieldset>
          <br />
          <br />
        </label>
        <label>
          {'Review Summary '}
          <br />
          <input name="summary" type="text" maxLength="60" placeholder="A small summary.." />
        </label>
        <br />
        <br />
        <label>
          {'Review Body* '}
          <br />
          <textarea
            name="body"
            type="text"
            rows="5"
            cols="50"
            maxLength="1000"
            placeholder="Why did you like the product or not?"
            onChange={(e) => setBodyChars(e.target.value)}
          />
          {bodyChars.length < 50
            ? <p>{`Minimum required characters left:${50 - bodyChars.length}`}</p>
            : <p>Minimum required characters reached</p>}
        </label>
        <br />
        <br />
        <label>
          {'Upload your photos* (Up to 5 pictures) '}
          <br />
          <input name="photos" type="file" />
        </label>
        <br />
        <br />
        <label>
          {'What is your nickname* '}
          <br />
          <input name="nickname" type="text" maxLength="60" placeholder="Example: jackson11!" />
        </label>
        <br />
        For privacy reasons, do not use your full name or email address.
        <br />
        <br />
        <label>
          {'Your email* '}
          <br />
          <input name="email" type="text" maxLength="60" placeholder="jackson11@email.com" />
        </label>
        <br />
        For authentication reasons, you will not be emailed.
        <br />
        <br />
        <input type="submit" value="Submit Review" />
        <br />
        <br />
        <div className="error">
          {invalidInput.length > 0 ? invalidInput : null}
        </div>
        <br />
      </form>
    </div>
  );
}
