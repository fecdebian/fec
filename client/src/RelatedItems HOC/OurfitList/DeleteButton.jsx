/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export default function DeleteButton({ selectedProduct, deleteOutfitHandler }) {
  const removeOutFitCardHandler = () => {
    let tmpOutfitString = localStorage.getItem('outfits');
    if (tmpOutfitString !== null) {
      const tmpOutfit = JSON.parse(tmpOutfitString);
      delete tmpOutfit[selectedProduct.id];
      tmpOutfitString = JSON.stringify(tmpOutfit);
      localStorage.setItem('outfits', tmpOutfitString);
      deleteOutfitHandler(tmpOutfit);
    }
  };

  return (
    <StyledRemovedCardButton
      onClick={removeOutFitCardHandler}
      type="button"
    >
      <span>&#10006;</span>
    </StyledRemovedCardButton>
  );
}

DeleteButton.propTypes = {
  selectedProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  deleteOutfitHandler: PropTypes.func.isRequired,
};

/* ===========    CSS Styled Components   =========== */
const StyledRemovedCardButton = styled.button`
  position:absolute;
  color:black;
  background-color:white ;
  border:solid;
  right:2%;
  font-size:1rem;
  font-weight:bold;
`;
