/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
// Note: adding photo functionality is commented out, does not work currently
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import PropTypes from 'prop-types';
import { updateQuestionsState } from './atoms';
import currentProductState from '../currentProduct';

function AddAnswer({ question }) {
  const product = useRecoilValue(currentProductState);
  const [updateQuestions, setUpdateQuestions] = useRecoilState(updateQuestionsState);
  const [invalidInput, setInvalidInput] = useState('');
  const [answerForm, setAnswerForm] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);

  function handleCloseForm(e) {
    e.preventDefault();
    const validEmail = /^\S+@\S+\.\S+$/;
    if (!validEmail.test(e.target.email.value)) {
      e.target.email.value = '';
      setInvalidInput('Error: must provide a valid email.');
      return;
    }
    if (photos.length > 5) {
      setInvalidInput('Error: maximum of 5 photos per answer.');
      return;
    }
    /*
      axios({
        method: 'post',
        url: 'http://thumbsnap.com/api/upload',
        data: { image: formData },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          key: '00001c532dc1d2ac78866881e1ddee52',
          image: formData,
        },
      }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.error('error posting photo: ', err);
      });
    */

    axios({
      method: 'post',
      url: `/qa/questions/${question.question_id}/answers`,
      data: {
        body: e.target.body.value,
        name: e.target.nickname.value,
        email: e.target.email.value,
        product_id: product.id,
        photos: [],
      },
    }).then(() => {
      setUpdateQuestions(updateQuestions + 1);
    }).catch((err) => {
      console.error('error posting answer: ', err);
    });

    setAnswerForm(!answerForm);
    e.target.nickname.value = '';
    e.target.body.value = '';
    e.target.filename.value = '';
    e.target.email.value = '';
    setPhotos([]);
    setPhotoURLs([]);
  }

  function handleAddAnswer(e) {
    e.preventDefault();
    setAnswerForm(!answerForm);
  }

  function handleImageUpload(e) {
    e.preventDefault();
    setPhotos([...e.target.files]);
  }

  useEffect(() => {
    if (photos.length < 1) {
      return;
    }
    const newPhotoURLs = [];
    photos.forEach((photo) => {
      newPhotoURLs.push(URL.createObjectURL(photo));
    });
    setPhotoURLs(newPhotoURLs);
  }, [photos]);

  return (
    <span
      css={css`
    .modal {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }

    .modal-main {
      position:fixed;
      background: white;
      width: 50%;
      height: auto;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      border: solid black 2px;
      text-align: center;
      white-space: normal;
      word-wrap: break-word;
    }

    .display-block {
      display: block;
    }

    .error {
      color: red;
    }

    .exit {
      float: right;
      margin: 5px;
    }

    img {
      border: 1px solid #ddd; /* Gray border */
      border-radius: 4px;  /* Rounded border */
      padding: 5px; /* Some padding */
      width: 50px; /* Set a small width */
      height: 50px;
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

    .display-none {
      display: none;
    }`}
    >
      <button onClick={handleAddAnswer} type="button">Add Answer</button>
      <div onClick={handleAddAnswer} className={answerForm ? 'modal' : 'display-none'} />
      <form onSubmit={handleCloseForm} className={answerForm ? 'display-block modal-main' : 'display-none'}>
        <button onClick={handleAddAnswer} className="exit" type="button">X</button>
        <br />
        <h3>Submit Your Answer</h3>
        {`${product.name}: ${question.question_body}`}
        <br />
        <br />
        <label>
          {'Your Answer* '}
          <br />
          <textarea data-testid="a-answer" name="body" type="text" rows="5" cols="50" maxLength="1000" required />
        </label>
        <br />
        <br />
        <label>
          {'What is your nickname* '}
          <br />
          <input data-testid="a-name" name="nickname" type="text" maxLength="60" placeholder="Example: jackson11!" required />
        </label>
        <br />
        For privacy reasons, do not use your full name or email address.
        <br />
        <br />
        <label>
          {'Your email* '}
          <br />
          <input data-testid="a-email" name="email" type="text" maxLength="60" placeholder="Why did you like the product or not?" required />
        </label>
        <br />
        For authentication reasons, you will not be emailed.
        <br />
        <br />
        <label>
          Upload your photos:
          <br />
          <input data-testid="a-file" type="file" onChange={handleImageUpload} name="filename" accept="image/*" multiple />
        </label>
        <br />
        {'Hold shift to select multiple photos (up to 5) '}
        <br />
        {photoURLs.map((photo) => <img key={photo} src={photo} alt="thumbnail" />)}
        <br />
        <input data-testid="a-submit" type="submit" value="Submit Answer" />
        <br />
        <br />
        <div className="error">
          {invalidInput.length > 0 ? invalidInput : null}
        </div>
        <br />
      </form>
    </span>
  );
}

AddAnswer.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number,
    question_body: PropTypes.string,
    question_date: PropTypes.string,
    question_helpfulness: PropTypes.number,
    reported: PropTypes.bool,
    answers: PropTypes.shape({}),
  }).isRequired,
};

export default AddAnswer;
