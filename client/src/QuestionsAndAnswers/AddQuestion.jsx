/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { questionFormState, updateQuestionsState } from './atoms';
import currentProductState from '../currentProduct';

function AddQuestion() {
  const [questionForm, setQuestionForm] = useRecoilState(questionFormState);
  const product = useRecoilValue(currentProductState);
  const [updateQuestions, setUpdateQuestions] = useRecoilState(updateQuestionsState);
  const [invalidInput, setInvalidInput] = useState('');

  function handleCloseForm(e) {
    e.preventDefault();
    const validEmail = /^\S+@\S+\.\S+$/;
    if (e.target.body.value.length === 0) {
      setInvalidInput('Error: Must include a question.');
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
    if (!validEmail.test(e.target.email.value)) {
      e.target.email.value = '';
      setInvalidInput('Error: must provide a valid email.');
      return;
    }
    axios({
      method: 'post',
      url: '/qa/questions',
      data: {
        body: e.target.body.value,
        name: e.target.nickname.value,
        email: e.target.email.value,
        product_id: product.id,
      },
    }).then(() => {
      setUpdateQuestions(updateQuestions + 1);
    }).catch((err) => {
      console.error('error posting question: ', err);
    });
    setQuestionForm(!questionForm);
    console.log(questionForm);
  }

  function handleExit(e) {
    e.preventDefault();
    setQuestionForm(!questionForm);
    console.log(questionForm);
  }

  return (
    <div
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
    }`}
    >
      <div onClick={handleExit} className={questionForm ? 'modal' : 'display-none'} />
      <form onSubmit={handleCloseForm} className={questionForm ? 'display-block modal-main' : 'display-none'}>
        <button onClick={handleExit} className="exit" type="button">X</button>
        <br />
        <h3>Ask Your Question</h3>
        {`About The ${product.name}`}
        <br />
        <br />
        <label>
          {'Your Question* '}
          <br />
          <textarea name="body" type="text" rows="5" cols="50" maxLength="1000" />
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
          <input name="email" type="text" maxLength="60" placeholder="Why did you like the product or not?" />
        </label>
        <br />
        For authentication reasons, you will not be emailed.
        <br />
        <br />
        <input type="submit" value="Submit Question" />
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

export default AddQuestion;
