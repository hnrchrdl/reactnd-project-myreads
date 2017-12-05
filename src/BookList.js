import Book from './Book';
import React from 'react';

function BookList(props) {

    // set sensible default props
    props = { ...props, books: props.books || [] }

    return (
        <ol className="books-grid">
            {props.books.length > 0 ? 
                props.books.map(book => (
                        <Book key={book.id} id={book.id} title={book.title} authors={book.authors} 
                            shelf={book.shelf} imageLinks={book.imageLinks} 
                            onBookUpdate={props.onBookUpdate} />
                )) : 
                ( <div>No books to show.</div> )
            }
        </ol>
    );
}

export default BookList;
