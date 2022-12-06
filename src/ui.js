import Storage from "./storage";
import Book from "./book";
export default class UI{
  static loadHomePage(){
    UI.createHeader();
    UI.createLibrarySection();
    UI.loadAddForm();
    UI.loadAddButton();
    UI.createBookCatalog();
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
    const bookCatalog = document.querySelector('.book-catalog');
    bookCatalog.innerHTML = "";

    const library = Storage.getLibrary();
    library.getBooks().forEach((book) =>{
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
        <h1>By: ${book.author}</h1>
        <h1>${book.pageCount} Pages</h1>
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

   addBtn.addEventListener('click', (e)=>{
    UI.openForm();
   });
  
   librarySection.appendChild(addBtn);
  }

  static loadDeleteButton(){
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', (e)=>{
      const bookTitle = e.target.parentNode.parentNode.firstElementChild.firstElementChild.textContent;
      Storage.deleteBook(bookTitle);
      UI.loadBooks();
    })
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

  static loadConfirmButton(){
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.addEventListener('click', (e)=>{
      // const book = UI.getFormInputs();
      // Storage.addBook(book);
      // UI.closeForm();
      // UI.loadBooks();
      UI.getFormInputs();
    })
    return confirmBtn;
  }

  static loadCancelButton(){
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', (e)=>{
      e.preventDefault(); //prevents default form behavior (which is submit)
      UI.closeForm();
    })
    return cancelBtn;
  }
  // ======================================

  // Forms
  static loadAddForm(){
    const header = document.querySelector('.header');
    const form = document.createElement('form');
    form.classList.add('book-form');
    form.setAttribute('onsubmit', 'return false');
    form.innerHTML = `
      <div class="form-inputs">
        <div class="form-row">
          <input id="title" name="title" type="text" placeholder="Book Title" required/>
        </div>
        <div class="form-row">
          <input id="author" name="author" type="text" placeholder="Book Author" required/>
        </div>
        <div class="form-row">
          <input id="pages" name="pages" type="number" placeholder="e.g 1000" min="1" required/>
        </div>
        <div class="form-row">
          <label for="read">Have you read the book?</label>
          <input id="read" name="read" type="checkbox"/>
        </div>
      </div>
    `

    const formBtns = document.createElement('div');
    formBtns.classList.add('form-buttons');
    formBtns.append(UI.loadConfirmButton(), UI.loadCancelButton());
    form.appendChild(formBtns);
    header.appendChild(form);
  }

  static openForm(){
    const form = document.querySelector('.book-form');
    form.classList.add('opened');
    UI.clearForm();
  }

  static clearForm(){
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pageCount = document.querySelector("#pages");
    const isRead = document.querySelector("#read");
    title.value = "";
    author.value ="";
    pageCount.value = "";
    isRead.checked = "false";
  }

  static closeForm(){
    const form = document.querySelector('.book-form');
    form.classList.remove('opened');
  }

  static getFormInputs(){
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pageCount = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;
    UI.validateFormInputs(title, author, pageCount, isRead);
  }

  static validateFormInputs(title, author, pageCount, isRead){
    if(title === "" || author === ""|| pageCount ===""){
      return
    }else{
      Storage.addBook(new Book(title, author,pageCount,isRead));
      UI.closeForm();
      UI.loadBooks();
    }
  }

  // ==========================================
}