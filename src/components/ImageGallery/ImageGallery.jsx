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
