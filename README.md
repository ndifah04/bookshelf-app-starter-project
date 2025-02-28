# Bookshelf App Starter Project

Ini adalah starter project untuk siswa yang sedang mengerjakan tugas akhir kelas Belajar Membuat Front-End Web untuk Pemula.

## Ketentuan Pengerjaan Tugas

Untuk mempermudah penilaian submission yang dikirim, Anda perlu memahami ketentuan-ketentuan berikut dalam mengerjakan tugas ini.

- Anda dilarang mengedit atau menghapus atribut `data-testid` pada elemen-elemen HTML.
- Ini masih berkaitan dengan poin sebelumnya. Jika Anda memiliki kebutuhan seperti styling elemen dan perlu menambahkan atribut seperti class, itu tidak dilarang selama atribut `data-testid` beserta nilainya tidak diubah atau dihapus.
- Dalam menampilkan data-data buku, Anda wajib memberikan beberapa atribut pada setiap elemennya.

  - `data-bookid`: menampung nilai ID masing-masing buku.
  - `data-testid`: penanda jenis data buku yang ditampilkan. Berikut daftarnya.
    - `bookItem`: elemen kontainer yang menampung data-data buku.
    - `bookItemTitle`: judul buku
    - `bookItemAuthor`: penulis buku
    - `bookItemYear`: tahun rilis buku
    - `bookItemIsCompleteButton`: tombol untuk mengubah kondisi buku dari "Belum selesai dibaca" menjadi "Selesai dibaca" atau sebaliknya.
    - `bookItemDeleteButton`: tombol untuk menghapus buku.
    - `bookItemEditButton`: tombol untuk mengubah data buku.

  Agar pengerjaan tugas lebih mudah, Anda dapat mengikuti templat buku berikut.

```html
<div data-bookid="{{ ID_buku }}" data-testid="bookItem">
  <h3 data-testid="bookItemTitle">{{ judul_buku }}</h3>
  <p data-testid="bookItemAuthor">Penulis: {{ penulis_buku }}</p>
  <p data-testid="bookItemYear">Tahun: {{ tahun_rilis_buku }}</p>
  <div>
    <button data-testid="bookItemIsCompleteButton">{{ tombol_untuk_ubah_kondisi }}</button>
    <button data-testid="bookItemDeleteButton">{{ tombol_untuk_hapus }}</button>
    <button data-testid="bookItemEditButton">{{ tombol_untuk_edit }}</button>
  </div>
</div>
```

## Penjelasan `main.js`

### 1. **Penyimpanan Data Buku**
Aplikasi ini menggunakan `localStorage` untuk menyimpan daftar buku. Data disimpan dengan kunci `STORAGE_KEY`.

```javascript
const STORAGE_KEY = 'bookshelfApp';
let books = [];
```

Saat halaman dimuat, data buku yang tersimpan akan diambil dan ditampilkan.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(STORAGE_KEY)) {
    books = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  renderBooks();

  document.getElementById('bookForm').addEventListener('submit', addBook);
  document.getElementById('searchBook').addEventListener('submit', searchBook);
});
```

### 2. **Fungsi Menyimpan Data ke `localStorage`**
Data buku disimpan setiap kali ada perubahan daftar buku.

```javascript
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
```

### 3. **Menambahkan Buku Baru**
Ketika pengguna mengisi formulir dan menekan submit, buku akan ditambahkan ke dalam daftar dan disimpan di `localStorage`.

```javascript
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
```

### 4. **Menampilkan Buku dalam List**
Setiap kali terjadi perubahan data, daftar buku akan diperbarui di UI.

```javascript
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
```

### 5. **Mengubah Status Buku**
Ketika tombol "Selesai Dibaca" atau "Belum Selesai Dibaca" ditekan, status buku akan berubah.

```javascript
function toggleBookStatus(bookId) {
  const book = books.find((b) => b.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    saveToLocalStorage();
    renderBooks();
  }
}
```

### 6. **Menghapus Buku**
Buku dapat dihapus dari daftar.

```javascript
function deleteBook(bookId) {
  books = books.filter((b) => b.id !== bookId);
  saveToLocalStorage();
  renderBooks();
}
```

### 7. **Mengedit Buku**
Ketika tombol "Edit Buku" ditekan, formulir akan diisi dengan data buku yang dipilih, lalu buku dihapus sementara dari daftar.

```javascript
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
```

### 8. **Pencarian Buku**
Pengguna dapat mencari buku berdasarkan judul.

```javascript
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
```

---
Dengan penjelasan ini, Anda dapat memahami fungsi `main.js` dalam aplikasi Bookshelf App. Semoga sukses! 🚀


# Bintang yang saya dapatkan
! [bintang.png]bintang
