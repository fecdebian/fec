/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { showModal } from './overviewAtoms';
import GalleryDefault from './GalleryDefault';

export default function ModalGallery() {
  const [toggleModal, setToggleModal] = useRecoilState(showModal);
  console.log('toggleModal', toggleModal);
  if (toggleModal === false) {
    return null;
  }

  const hideModal = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      setToggleModal(false);
    }
  };

  document.body.addEventListener('keydown', hideModal);

  return (
    <div
      show={toggleModal.toString()}
      className="modal"
      css={css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index:30;
        `}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">

        </div>
        <div className="modal-body">
          <GalleryDefault />
        </div>
        <div className="modal-footer">

        </div>
      </div>
    </div>
  );
}
