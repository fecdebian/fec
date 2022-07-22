/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export default function AddToOutfit({ AddToOutfitHandler }) {
  return (
    <div>
      <StyledAddOutfitButton
        type="button"
        onClick={AddToOutfitHandler}
      >
        &#43;
      </StyledAddOutfitButton>
      <div>Add to Outfit</div>
    </div>
  );
}

AddToOutfit.propTypes = {
  currentProductDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  AddToOutfitHandler: PropTypes.func.isRequired,
};

/* ===========    CSS Styled Components   =========== */
const StyledAddOutfitButton = styled.button`
  font-size: 12rem;
  background-color: transparent;
`;
