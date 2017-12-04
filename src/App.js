import './App.css';

import * as BooksAPI from './BooksAPI';

import { Link, Route } from 'react-router-dom';

import BookShelf from './BookShelf';
import Header from './Header';
import React from 'react';
import Search from './Search';

;

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [], // array of books
    shelfs: [ // hardcoded book shelfs
      { id: 'currentlyReading', title: 'Currently Reading'},
      { id: 'wantToRead', title: 'Want to Read'},
      { id: 'read', title: 'Read'}
    ],
    searchResults: []
  }

  componentDidMount() {    
    BooksAPI.getAll().then(books => {
      console.log(books)
      this.setState({ books })
    });
  }

  /**
   * Updates the Book's Status
   * @param {string} bookId: The Book's Id
   * @param {string} shelfId: The Shelf's Id
   */
  updateBookStatus = (bookId, shelfId) => {
    this.setState(state => shelfId ?
      { books: state.books.map(book => (book.id === bookId ? { ...book, shelf: shelfId } : book))} :
      { books: state.books.filter(book => book.id !== bookId )}
    );
    BooksAPI.update({ id: bookId }, shelfId || 'none' );
  }

  searchBooks = (term) => {
    if(!term || term.length < 1) {
      this.setState({ searchResults: []})
    } else {
      BooksAPI.search(term).then((result) => {
        this.setState({
          searchResults: Array.isArray(result) ? result : []
        });
      });
    }
  }

  render() {
    return (
        <div className="app">
          <Route path="/search" render={() => (
            <Search onSearchTermChange={this.searchBooks} results={this.state.searchResults}
              onBookUpdate={this.updateBookStatus}/>
          )}/>
          <Route exact path="/" render={() => (
            <div className="list-books">
              <Header/>
              <div className="list-books-content">
                {this.state.shelfs.map(shelf => (
                <BookShelf 
                  key={shelf.id}
                  title={shelf.title}
                  books={this.state.books.filter(book => book.shelf === shelf.id)}
                  onBookUpdate={this.updateBookStatus}
                />
                ))}
              </div>
              <div className="open-search">
                  <Link to="/search"></Link>
                {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
