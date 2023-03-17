import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./App.css";
import ListBook from "./ListBook";
import SearchBook from "./SearchBook";
import * as BooksAPI from './BooksAPI'

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    }

    getBooks();
  }, []);

  const updateBookShelfHandler = (book, shelf) => {
    BooksAPI.update(book, shelf);
    const found = books.find(item => item.id === book.id);
    if (found) {
      found.shelf = shelf;
      setBooks(books);
    } else {
      book.shelf = shelf;
      setBooks(books.concat(book));
    }
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<ListBook books={books} />} />
        <Route exact path="/search" element={<SearchBook selectedBooks={books} updateBookShelf={updateBookShelfHandler} />} />
      </Routes>
    </div>
  );
}

export default App;
