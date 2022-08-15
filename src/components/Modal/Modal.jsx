import { Overlay, ModalWindow } from './Modal.styled';
// import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, src, alt }) => {
  window.addEventListener('keydown', handleKeyDown);

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', handleKeyDown);
    }
  }

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};
