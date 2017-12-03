import React from 'react';

const bookOptions = [
    { id: 0, value: null, text: 'Move to...', disabled: true },
    { id: 1, value: 'currentlyReading', text: 'Currently Reading', disabled: false },
    { id: 2, value: 'wantToRead', text: 'Want to Read', disabled: false },
    { id: 3, value: 'read', text: 'Read', disabled: false },
    { id: 4, value: null, text: 'None', disabled: false }
];

function Book(props) {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${props.imageLinks.thumbnail}')` }}></div>
                    <div className="book-shelf-changer">
                    <select>
                        {bookOptions.map(o => (
                            <option
                                key={o.id}
                                value={o.value} 
                                onClick={() => props.onBookUpdate(props.id, o.value)}>
                                {o.text}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="book-title">{props.title}</div>
                <div className="book-authors">{props.authors.join(', ')}</div>
            </div>
        </li>
    );
}

export default Book;