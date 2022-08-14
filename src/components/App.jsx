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
    // isLoading: false,
    error: false,
    status: 'idle',
  };
  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    try {
      if (prevState.query !== query || prevState.page !== page) {
        this.setState({ status: 'pending' });
        const images = await fetchImages(query, page);

        if (images.totalHits === 0) {
          this.setState({ status: 'rejected' });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isLoading: false,
          status: 'resolved',
          totalImages: images.totalHits,
          page,
        }));
      }
    } catch (error) {
      this.setState({ error: true, status: 'rejected' });
      toast.error('Oop! Something went wrong! Try again later!');
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
    const { images, totalImages, status } = this.state;
    const { getValueFormSubmit, loadMore } = this;

    return (
      <AppContainer>
        <GlobalStyle />
        <Searchbar onSubmit={getValueFormSubmit} />
        {status === 'idle' && (
          <FoundMessage>Enter a search query.</FoundMessage>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <FoundMessage>
            "Sorry, there are no images matching your search query. Please try
            again.
          </FoundMessage>
        )}
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'resolved' && totalImages - images.length > 0 ? (
          <Button onClick={loadMore} />
        ) : null}
        {status === 'resolved' && totalImages - images.length <= 0 ? (
          <FoundMessage>
            We're sorry, but you've reached the end of search results.
          </FoundMessage>
        ) : null}

        <ToastContainer />
      </AppContainer>
    );
  }
}
