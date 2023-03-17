import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookItem from './BookItem';
import * as BooksAPI from './BooksAPI';

const ListBook = ({ books }) => {
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    setCurrentlyReading(books.filter(book => book.shelf === "currentlyReading"));
    setWantToRead(books.filter(book => book.shelf === "wantToRead"));
    setRead(books.filter(book => book.shelf === "read"));
  }, [books]);

  const onChangeShelfHandler = (book, shelf) => {
    const found = books.find(item => item.id === book.id);
    found.shelf = shelf;
    setCurrentlyReading(books.filter(book => book.shelf === "currentlyReading"));
    setWantToRead(books.filter(book => book.shelf === "wantToRead"));
    setRead(books.filter(book => book.shelf === "read"));
    BooksAPI.update(book, shelf);
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BookItem books={currentlyReading} onChangeShelfHandler={onChangeShelfHandler} />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BookItem books={wantToRead} onChangeShelfHandler={onChangeShelfHandler} />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BookItem books={read} onChangeShelfHandler={onChangeShelfHandler} />
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div >
  );
}

export default ListBook;