import Book from "./book";
import Library from "./library";

export default class Storage{
  static saveLibrary(data){
    localStorage.setItem('library', JSON.stringify(data))
  }

  static getLibrary(){
    const library = Object.assign(new Library(), JSON.parse(localStorage.getItem('library')));
    library.setBooks(
      library.getBooks().map((book) => Object.assign(new Book(), book))
    );
    return library;
  }

  static addBook(book){
    let library = Storage.getLibrary();
    library.addBooks(book);
    Storage.saveLibrary(library);
  }

  static deleteBook(bookTitle){
    let library = Storage.getLibrary();
    library.deleteBook(bookTitle);
    Storage.saveLibrary(library);
  }
}