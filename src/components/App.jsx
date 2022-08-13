import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'services/API';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isLoading: false,
    error: false,
  };
  async componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.value !== this.state.value ||
        prevState.page !== this.state.page
      ) {
        this.setState({ isLoading: true });
        const images = await fetchImages(this.state.value, this.state.page);

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isLoading: false,
          // page: this.prevState.page + 1,
        }));
      }
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
    }
  }

  getValueFormSubmit = value => {
    this.setState(value);
  };

  render() {
    // console.log()
    const { getValueFormSubmit } = this;
    // const { isLoading } = this.setState;
    return (
      <AppContainer>
        <GlobalStyle />
        {this.state.error && (
          <p>
            Ой! Что-то пошло не так. Перезагрузите страницу и попробуйте еще
            раз.E
          </p>
        )}
        <Searchbar onSubmit={getValueFormSubmit} />
        {this.state.isLoading ? (
          'Загружаем материалы'
        ) : (
          <ImageGallery images={this.state.images} />
        )}

        <ToastContainer />
      </AppContainer>
    );
  }
}
