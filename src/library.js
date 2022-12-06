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
}