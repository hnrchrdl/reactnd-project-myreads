import Book from './Book';
import React from 'react';

function BookList(props) {
    return (
        <ol className="books-grid">
            {props.books.map(book => (
                <li>
                    <Book title={book.title} authors={book.authors}
                            imageLinks={book.imageLinks} />
                </li>
            ))}
        </ol>
    );
}

export default BookList;
