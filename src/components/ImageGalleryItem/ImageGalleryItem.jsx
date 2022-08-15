import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import { Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;

    return (
      <>
        <Image src={webformatURL} alt={tags} onClick={this.openModal} />
        {this.state.isModalOpen && (
          <Modal onClose={this.closeModal} src={largeImageURL} alt={tags} />
        )}
      </>
    );
  }
}
