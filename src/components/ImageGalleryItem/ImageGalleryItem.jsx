import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { webformatURL, tags, largeImageURL } = image;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Image src={webformatURL} alt={tags} onClick={openModal} />
      {isModalOpen && (
        <Modal onClose={closeModal} src={largeImageURL} alt={tags} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
