import React from 'react';
import axios from 'axios';

export default function withBigBrotherWatching(WrappedComponent) {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  const bigBrotherIsWatchingYouClickHandler = (event) => {
    // event.preventDefault();
    axios({
      method: 'post',
      url: '/interactions',
      data: {
        element: event.target.outerHTML,
        widget: wrappedComponentName,
        time: new Date().toTimeString(),
      },
    }).then((res) => {
      // console.log('Big Brother Is Watching You', res.data);
    }).catch((err) => {
      console.error('error posting photo: ', err);
    });
  };

  function WithBigBrotherWatching() {
    return (
      <div onClick={bigBrotherIsWatchingYouClickHandler}>
        <WrappedComponent />
      </div>
    );
  }

  WithBigBrotherWatching.displayName = `withBigBrotherWatching(${wrappedComponentName})`;
  return WithBigBrotherWatching;
}
