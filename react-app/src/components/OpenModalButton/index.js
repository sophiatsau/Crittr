import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className,
  id,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick(e);
  };

  return (
    <button onClick={onClick} id={id} className={className}>{buttonText}</button>
  );
}

export default OpenModalButton;
