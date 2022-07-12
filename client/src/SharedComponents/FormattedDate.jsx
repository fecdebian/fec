import React from 'react';
import PropTypes from 'prop-types';

export default function FormattedDate({ dateStr }) {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return <div>{formattedDate}</div>;
}

FormattedDate.propTypes = {
  dateStr: PropTypes.string.isRequired,
};
