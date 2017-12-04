import React, { Component } from 'react';

const bookOptions = [
    { id: 0, value: null, text: 'Move to...', disabled: true },
    { id: 1, value: 'currentlyReading', text: 'Currently Reading', disabled: false },
    { id: 2, value: 'wantToRead', text: 'Want to Read', disabled: false },
    { id: 3, value: 'read', text: 'Read', disabled: false },
    { id: 4, value: 'none', text: 'None', disabled: false }
];

class Book extends Component {
    
    bookOptionChanged = (e) => {
        const shelfId = e.target.value;
        const bookId = this.props.id;
        this.props.onBookUpdate(bookId, shelfId);
    }
    
    render() {


        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" 
                            style={{ width: 128, height: 193, 
                                backgroundImage: `url('${this.props.imageLinks.thumbnail}')` }}>
                        </div>
                        <div className="book-shelf-changer">
                        <select value={this.props.shelf || 'none'} onChange={this.bookOptionChanged}>
                            {bookOptions.map(o => (
                                <option
                                    key={o.id}
                                    value={o.value}
                                    disabled={o.disabled}>
                                    {o.text}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors.join(', ')}</div>
                </div>
            </li>
        );
    }
}

export default Book