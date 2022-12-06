import Book from "./book";

export default class Library{
  constructor(){
    this.books = [];
    this.books.push(new Book('Harry Potter', 'JK Rowling', 1000 ,false));
    this.books.push(new Book('Harry Potter', 'JK Rowling', 1000 ,false));
    this.books.push(new Book('Harry Potter', 'JK Rowling', 1000 ,false));
    this.books.push(new Book('Harry Potter', 'JK Rowling', 1000 ,false));
  }


  getBooks(){
    return this.books;
  }

  setBooks(books){
    this.books = books;
  }

  addBooks(book){
    this.books.push(book);
  }


  deleteBook(bookTitle) {
    
    const bookToDelete = this.books.find(
      (book) => book.getTitle() === bookTitle
    );
    console.log(bookToDelete);
    this.books.splice(this.books.indexOf(bookToDelete), 1)
  }

}