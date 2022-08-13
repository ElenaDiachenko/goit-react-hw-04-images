import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { fetchImages } from 'services/API';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: false,
  };
  async componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.query !== this.state.query ||
        prevState.page !== this.state.page
      ) {
        this.setState({ isLoading: true });
        const images = await fetchImages(this.state.query, this.state.page);

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isLoading: false,
          page: this.state.page,
        }));
      }
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
    }
  }

  loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  getValueFormSubmit = ({ value }) => {
    this.setState({
      page: 1,
      query: value,
      images: [],
    });
  };

  render() {
    const { isLoading, error, images } = this.state;
    const { getValueFormSubmit, loadMore } = this;
    return (
      <AppContainer>
        <GlobalStyle />
        {error && (
          <p>
            Ой! Что-то пошло не так. Перезагрузите страницу и попробуйте еще
            раз.E
          </p>
        )}
        <Searchbar onSubmit={getValueFormSubmit} />
        {isLoading ? 'Загружаем материалы' : <ImageGallery images={images} />}
        {images.length && !isLoading && <Button onClick={loadMore} />}
        <ToastContainer />
      </AppContainer>
    );
  }
}
