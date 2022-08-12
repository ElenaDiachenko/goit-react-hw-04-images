import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/API';

export class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Searchbar onSubmit={console.log} />
      </div>
    );
  }
}
