import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/API';
import { AppContainer, FoundMessage } from './App.styled';
// import { useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }
    (async function fetchData() {
      try {
        setStatus('pending');
        const { hits, totalHits } = await fetchImages(query, page);

        if (totalHits === 0) {
          setStatus('rejected');
          toast.warning(
            'Sorry, there are no images matching your search query. Please, try again'
          );
          return;
        }
        setImages(images => [...images, ...hits]);
        setStatus('resolved');
        setPage(page);
        setTotalImages(totalHits);
      } catch (error) {
        console.log(error.message);
        setStatus('rejected');
        toast.warning('Oop! Something went wrong! Try again later!');
      }
    })();
  }, [page, query]);

  const loadMore = async () => {
    setPage(page => page + 1);
  };

  const getValueFormSubmit = ({ value }) => {
    if (value.trim().length === 0) {
      toast.warning(
        'Sorry, there are no images matching your search query. Please, try again'
      );
      return;
    }
    setPage(1);
    setQuery(value);
    setImages([]);

    // this.setState({

    //     page: 1,
    //     query: value,
    //     images: [],
    //   });
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <Searchbar onSubmit={getValueFormSubmit} />
      {status === 'idle' && (
        <FoundMessage>Please, enter a search query.</FoundMessage>
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <FoundMessage>
          "Sorry, there are no images matching your search query. Please try
          again.
        </FoundMessage>
      )}
      <ImageGallery images={images} />
      {status === 'resolved' && totalImages - images.length > 0 ? (
        <Button onClick={loadMore} />
      ) : null}
      {status === 'resolved' && totalImages - images.length <= 0 ? (
        <FoundMessage>
          We're sorry, but you've reached the end of search results.
        </FoundMessage>
      ) : null}

      <ToastContainer
        autoClose={3000}
        theme={'colored'}
        hideProgressBar={false}
      />
    </AppContainer>
  );

  // export class App1 extends Component {
  //   // state = {
  //   //   query: '',
  //   //   page: 1,
  //   //   totalImages: null,
  //   //   images: [],
  //   //   error: false,
  //   //   status: 'idle',
  //   // };

  //   async componentDidUpdate(_, prevState) {
  //     const { query, page } = this.state;

  //     try {
  //       if (prevState.query !== query || prevState.page !== page) {
  //         this.setState({ status: 'pending' });
  //         const images = await fetchImages(query, page);

  //         if (images.totalHits === 0) {
  //           this.setState({ status: 'idle' });
  //           toast.warning(
  //             'Sorry, there are no images matching your search query. Please, try again'
  //           );
  //           return;
  //         }

  //         this.setState(prevState => ({
  //           images: [...prevState.images, ...images.hits],
  //           status: 'resolved',
  //           totalImages: images.totalHits,
  //           page,
  //         }));
  //       }
  //     } catch (error) {
  //       this.setState({ error: true, status: 'rejected' });
  //       toast.warning('Oop! Something went wrong! Try again later!');
  //     } finally {
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }

  //   loadMore = async () => {
  //     this.setState(prevState => ({
  //       page: prevState.page + 1,
  //     }));
  //   };

  //   getValueFormSubmit = ({ value }) => {
  //     if (value.trim().length === 0) {
  //       toast.warning(
  //         'Sorry, there are no images matching your search query. Please, try again'
  //       );
  //       return;
  //     }
  //     this.setState({
  //       page: 1,
  //       query: value,
  //       images: [],
  //     });
  //   };

  //   render() {
  //     const { images, totalImages, status } = this.state;
  //     const { getValueFormSubmit, loadMore } = this;

  //     return (
  //       <AppContainer>
  //         <GlobalStyle />
  //         <Searchbar onSubmit={getValueFormSubmit} />
  //         {status === 'idle' && (
  //           <FoundMessage>Please, enter a search query.</FoundMessage>
  //         )}
  //         {status === 'pending' && <Loader />}
  //         {status === 'rejected' && (
  //           <FoundMessage>
  //             "Sorry, there are no images matching your search query. Please try
  //             again.
  //           </FoundMessage>
  //         )}
  //         {status === 'resolved' && <ImageGallery images={images} />}
  //         {status === 'resolved' && totalImages - images.length > 0 ? (
  //           <Button onClick={loadMore} />
  //         ) : null}
  //         {status === 'resolved' && totalImages - images.length <= 0 ? (
  //           <FoundMessage>
  //             We're sorry, but you've reached the end of search results.
  //           </FoundMessage>
  //         ) : null}

  //         <ToastContainer
  //           autoClose={3000}
  //           theme={'colored'}
  //           hideProgressBar={false}
  //         />
  //       </AppContainer>
  //     );
  //   }
};
