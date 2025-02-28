// Do your work here...
const STORAGE_KEY = 'bookshelfApp';
let books = [];

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(STORAGE_KEY)) {
    books = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  renderBooks();

  document.getElementById('bookForm').addEventListener('submit', addBook);
  document.getElementById('searchBook').addEventListener('submit', searchBook);
});

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function addBook(event) {
  event.preventDefault();
  
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;
  
  const book = {
    id: new Date().getTime(),
    title,
    author,
    year,
    isComplete,
  };
  
  books.push(book);
  saveToLocalStorage();
  renderBooks();
  document.getElementById('bookForm').reset();
}

function renderBooks() {
  const incompleteList = document.getElementById('incompleteBookList');
  const completeList = document.getElementById('completeBookList');
  incompleteList.innerHTML = '';
  completeList.innerHTML = '';

  books.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeList.appendChild(bookElement);
    } else {
      incompleteList.appendChild(bookElement);
    }
  });
}

function createBookElement(book) {
  const bookItem = document.createElement('div');
  bookItem.setAttribute('data-bookid', book.id);
  bookItem.setAttribute('data-testid', 'bookItem');
  
  bookItem.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton" onclick="toggleBookStatus(${book.id})">${book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca'}</button>
      <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">Hapus Buku</button>
      <button data-testid="bookItemEditButton" onclick="editBook(${book.id})">Edit Buku</button>
    </div>
  `;

  return bookItem;
}

function toggleBookStatus(bookId) {
  const book = books.find((b) => b.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    saveToLocalStorage();
    renderBooks();
  }
}

function deleteBook(bookId) {
  books = books.filter((b) => b.id !== bookId);
  saveToLocalStorage();
  renderBooks();
}

function editBook(bookId) {
  const book = books.find((b) => b.id === bookId);
  if (book) {
    document.getElementById('bookFormTitle').value = book.title;
    document.getElementById('bookFormAuthor').value = book.author;
    document.getElementById('bookFormYear').value = book.year;
    document.getElementById('bookFormIsComplete').checked = book.isComplete;
    
    deleteBook(bookId);
  }
}

function searchBook(event) {
  event.preventDefault();
  const query = document.getElementById('searchBookTitle').value.toLowerCase();
  
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(query));
  
  const incompleteList = document.getElementById('incompleteBookList');
  const completeList = document.getElementById('completeBookList');
  incompleteList.innerHTML = '';
  completeList.innerHTML = '';

  filteredBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeList.appendChild(bookElement);
    } else {
      incompleteList.appendChild(bookElement);
    }
  });
}

