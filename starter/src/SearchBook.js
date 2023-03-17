import { Link } from 'react-router-dom';
import { useState } from 'react';
import BookItem from './BookItem';
import * as BooksAPI from './BooksAPI';

const SearchBook = ({ selectedBooks, updateBookShelf }) => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);

  const onChangeSearchHandler = async (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
    if (!inputValue) {
      setBooks([]);
    } else {
      let searchResult = await BooksAPI.search(inputValue, 15);
      if (!searchResult || searchResult.items) {
        setBooks([]);
      } else {
        searchResult = searchResult.filter(book => book.imageLinks && book.imageLinks.thumbnail && book.authors)
        searchResult.forEach(book => {
          const found = selectedBooks.find(item => item.id === book.id)
          if (found) {
            book.shelf = found.shelf;
          }
        })
        setBooks(searchResult);
      }
    }
  }

  const onChangeShelfHandler = (book, shelf) => {
    const found = books.find(item => item.id === book.id);
    if (found) {
      found.shelf = shelf;
      setBooks(books);
    }
    updateBookShelf(book, shelf);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchText}
            onChange={onChangeSearchHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchText && !books.length && <p>Not found any books</p>}
        <BookItem books={books} onChangeShelfHandler={onChangeShelfHandler} />
      </div>
    </div>
  );
}

export default SearchBook;