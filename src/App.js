import './App.css';

import * as BooksAPI from './BooksAPI';

import BookShelf from './BookShelf';
import BrowserRouter from 'react-router-dom';
import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'

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
    ]
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
    console.log(shelfId)
    BooksAPI.update({ id: bookId }, shelfId || 'none' );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          {this.state.showSearchPage ? (
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          ) : (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
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
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
