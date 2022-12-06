import Storage from "./storage";
import Book from "./book";
export default class UI{
  static loadHomePage(){
    UI.createHeader();
    UI.createLibrarySection();
    UI.loadAddButton();
    UI.createBookCatalog();
    // Storage.addBook(new Book('The Hobbit', 'Tolkien', 2000, false));
    // Storage.getLibrary();
    UI.loadBooks();
    
  }

  // UI Layout
  static createHeader(){
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `
      <h1 class="application-title">Library Application</h1>
    `
    document.body.appendChild(header);
  }

  static createLibrarySection(){
    const librarySection = document.createElement('div');
    librarySection.classList.add('library-section');
    document.body.appendChild(librarySection);
  }

  static createBookCatalog(){
     const librarySection = document.querySelector('.library-section');
     const bookCatalog = document.createElement('div');
     bookCatalog.classList.add('book-catalog');
     librarySection.appendChild(bookCatalog);
  }
  // ======================================

  // Render Book Functionality
  static loadBooks(){
    const library = Storage.getLibrary()
    library.getBooks().forEach((book) =>{
      //Render Books Here
      UI.renderBookCard(book);
    })
  }

  static renderBookCard(book){
    const bookCatalog = document.querySelector('.book-catalog');
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <div class="book-details">
        <h1>${book.title}</h1>
        <h1>${book.author}</h1>
        <h1>${book.pageCount}</h1>
      </div>
    `
    const btnGroup = document.createElement('div');
    btnGroup.classList.add('button-group');
    btnGroup.appendChild(UI.loadToggleButton());
    btnGroup.appendChild(UI.loadEditButton());
    btnGroup.appendChild(UI.loadDeleteButton());
    bookCard.appendChild(btnGroup);
    bookCatalog.appendChild(bookCard);
  }
  // ========================================

  // Buttons
  static loadAddButton(){
   const librarySection = document.querySelector('.library-section');
   const addBtn = document.createElement('button') ;
   addBtn.classList.add('add-button');
   addBtn.textContent = 'Add Book';
  
   librarySection.appendChild(addBtn);
  }

  static loadDeleteButton(){
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-button');
    deleteBtn.textContent = 'Delete';
    return deleteBtn;
  }

  static loadToggleButton(){
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-button');
    toggleBtn.textContent = 'Read';
    return toggleBtn;
  }

  static loadEditButton(){
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-button');
    editBtn.textContent = 'Edit';
    return editBtn;
  }
  // ======================================
}