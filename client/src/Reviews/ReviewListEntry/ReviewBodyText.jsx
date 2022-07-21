/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ReviewBodyText({ text }) {
  // when btn is clicked, rest of the text should appear.
  const bodyText = text.slice(0, 250);
  const [showMore, setShowMore] = useState(text.length > 250);

  const btn = (
    <button
      type="button"
      onClick={() => setShowMore(() => !showMore)}
    >
      Show More
    </button>
  );

  return (
    <div>
      {showMore ? bodyText : text}
      {showMore ? btn : null}
    </div>
  );
}
