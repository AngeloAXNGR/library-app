export default class UI{
  static loadHomePage(){
    UI.createHeader();
    UI.createLibrarySection();
    UI.loadButtons();
    UI.createBookCatalog();
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

  // Buttons
  static loadButtons(){
    UI.makeAddButton();
  }

  static makeAddButton(){
   const librarySection = document.querySelector('.library-section');
   const addBtn = document.createElement('button') ;
   addBtn.classList.add('add-button');
   addBtn.textContent = 'Add Book';
  
   librarySection.appendChild(addBtn);
  }
  // ======================================
}