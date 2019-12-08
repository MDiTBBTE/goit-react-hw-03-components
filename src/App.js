import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import Gallery from './components/Gallery/Gallery';
import Loader from './components/Loader/Loader';
import ErrorNotification from './components/ErrorNotification/errorNotification';
import * as photosAPI from './services/photos-api';
import Modal from './components/Modal/Modal';
import Dashboard from './components/BankAccount/Dashboard/Dashboard';

class App extends Component {
  state = {
    photos: [],
    isLoading: false,
    error: null,
    modalUrl: '',
    isOpenModal: false,
    page: 1,
  };

  componentDidMount() {
    this.fetchPhotos();
  }

  handleOpenModal = url => {
    this.setState({ modalUrl: url, isOpenModal: true });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  handleChangePage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  fetchPhotos = (query, page) => {
    this.setState({ isLoading: true });

    query !== undefined
      ? photosAPI
          .searchPhotos(query, page)
          .then(({ data }) =>
            this.setState(state => ({
              photos: [...state.photos, ...data.hits],
            })),
          )
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ isLoading: false }))
      : this.setState({ isLoading: false });
  };

  render() {
    const { photos, isLoading, error, page } = this.state;
    return (
      <div>
        <Dashboard />
        <hr />

        {this.state.isOpenModal && (
          <Modal url={this.state.modalUrl} onClose={this.closeModal} />
        )}
        <SearchForm onSubmit={this.fetchPhotos} page={page} />
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Loader />}
        {photos.length > 0 && (
          <Gallery
            items={photos}
            handleOpenModal={this.handleOpenModal}
            handleChangePage={this.handleChangePage}
          />
        )}
      </div>
    );
  }
}

export default App;
