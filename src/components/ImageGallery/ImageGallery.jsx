import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageContainer, ItemGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageContainer>
      {images.map(image => {
        return (
          <ItemGallery key={image.id}>
            <ImageGalleryItem image={image} />
          </ItemGallery>
        );
      })}
    </ImageContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
