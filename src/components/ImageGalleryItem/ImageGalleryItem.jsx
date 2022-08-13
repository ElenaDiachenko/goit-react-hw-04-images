import { Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <>
      <Image src={image.webformatURL} alt="" />
    </>
  );
};
