import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/API';
import { AppContainer, FoundMessage } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    totalImages: null,
    images: [],
    isLoading: false,
    error: false,
  };
  async componentDidUpdate(_, prevState) {
    const { query, page, totalImages } = this.state;

    try {
      if (prevState.query !== query || prevState.page !== page) {
        this.setState({ isLoading: true });
        const images = await fetchImages(query, page);

        if (totalImages === 0) {
          this.setState({ totalImages: images.totalHits });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isLoading: false,
          page,
        }));
      }
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      toast.error('Oop! Something went wrong! Try again later!');
    }
  }

  loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getValueFormSubmit = ({ value }) => {
    if (value.trim() === '') {
      toast.error('Write a search');
      return;
    }
    this.setState({
      page: 1,
      query: value,
      images: [],
    });
  };

  render() {
    const { isLoading, images, query, totalImages } = this.state;
    const { getValueFormSubmit, loadMore } = this;

    return (
      <AppContainer>
        <GlobalStyle />
        <Searchbar onSubmit={getValueFormSubmit} />
        {!query && <FoundMessage>Ведитe запрос</FoundMessage>}
        {isLoading ? <Loader /> : <ImageGallery images={images} />}
        {images.length > 0 && !isLoading && totalImages - images.length && (
          <Button onClick={loadMore} />
        )}
        {images.length === 0 && query && !isLoading && (
          <FoundMessage>Such image theme not found</FoundMessage>
        )}
        <ToastContainer />
      </AppContainer>
    );
  }
}
