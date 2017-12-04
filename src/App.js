import './App.css';

import * as BooksAPI from './BooksAPI';

import { Link, Route } from 'react-router-dom';

import BookShelf from './BookShelf';
import Header from './Header';
import React from 'react';
import Search from './Search';

function sortBy(prop) {
  return (a, b) => {
    var x = a[prop].toLowerCase();
    var y = b[prop].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }
}

function mapSearchResultsToBooks(books) {
  return (item) => {
    const book = books.find(b => b.id === item.id);
    if(book) {
      item.shelf = book.shelf;
    } else {
      item.shelf = 'none';
    }
    return item;
  }
}

class BooksApp extends React.Component {

  state = {
    books: [], // array of books
    shelfs: [ // hardcoded book shelfs
      { id: 'currentlyReading', title: 'Currently Reading'},
      { id: 'wantToRead', title: 'Want to Read'},
      { id: 'read', title: 'Read'}
    ],
    searchTerm: '',
    searchResults: []
  }

  updateBookList() {
    BooksAPI.getAll().then(books => {
      console.log(books)
      books = [...books].sort(sortBy('title'));
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
      { books: state.books
          .map(book => (book.id === bookId ? { ...book, shelf: shelfId } : book))
          .sort(sortBy('title')) } :
      { books: state.books
          .filter(book => book.id !== bookId )
          .sort(sortBy('title')) }
    );
    BooksAPI.update({ id: bookId }, shelfId || 'none' ).then(() => {
      this.updateBookList();
    });
  }

  searchBooks = (searchTerm) => {
    
    this.setState({
      searchTerm
    });

    if(!searchTerm || searchTerm.length < 1) {
      this.setState({ searchResults: []})
    } else {
      BooksAPI.search(searchTerm).then((result) => {
        console.log(result)
        this.setState({
          searchResults: Array.isArray(result) ? result : []
        });
      });
    }
  }

  componentDidMount() {
    this.updateBookList();
  }

  render() {
    return (
      <div className="app">
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
                onMount={this.updateBookList}
              />
              ))}
            </div>
            <div className="open-search">
                <Link to="/search"></Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <div className="app">
            <Header/>
            <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.searchBooks} 
              results={this.state.searchResults.map(mapSearchResultsToBooks(this.state.books))}
              onBookUpdate={this.updateBookStatus}/>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp