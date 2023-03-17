const BookItem = ({ books, onChangeShelfHandler }) => {
  const handleOnChange = (e, book) => {
    const shelf = e.target.options[e.target.selectedIndex].value;
    if (onChangeShelfHandler) {
      onChangeShelfHandler(book, shelf);
    }
  }

  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks.thumbnail})`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : "none"} onChange={event => handleOnChange(event, book)}>
                  {book.shelf && (<option value="moveto" disabled>Move to...</option>)}
                  {!book.shelf && (<option value="none" disabled>Add to...</option>)}
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  {book.shelf && (<option value="none">None</option>)}
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>))}
    </ol>
  );
};

export default BookItem;