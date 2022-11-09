// Storage for book objects
let library = [];


// Modal button functionality
const Modal = (() =>{
  let modal = document.querySelector("#modal-cover");
  let addButton = document.querySelector("#add-button");
  let closeButton = document.querySelector(".close-button");

  window.onclick = function(e){
    if(e.target == modal){
      modal.style.display = "none";
    }
  }
  
  closeButton.addEventListener('click', (e) =>{
    Form.resetForm();
    modal.style.display = "none";
  })
  
  
  addButton.addEventListener('click', (e) =>{
    modal.style.display = "flex";
  })

  return{modal}
})();

// Book Class
class Book{
  constructor(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  // getters
  get bookDescription(){
    return `${this.title} by ${this.author}, has ${this.pages} pages.`;
  }
}


// Library Module
const Library = (library) =>{
  let bookCatalog = document.querySelector('.book-catalog');
  // Render Book Functions
  const displayBooks = () =>{
    for(let i = 0; i <= library.length - 1; i++){
      let bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
  
      let bookTitle = document.createElement('h1');
      bookTitle.textContent = library[i].title;
      bookCard.appendChild(bookTitle);
  
      let bookAuthor = document.createElement('h1');
      bookAuthor.textContent = library[i].author;
      bookCard.appendChild(bookAuthor);
  
      let bookPages = document.createElement('h1');
      bookPages.textContent = `${library[i].pages} Pages`;
      bookCard.appendChild(bookPages);
  
      let buttonGroup = document.createElement('div');
      buttonGroup.classList.add('button-group');
  
      let readBtn = document.createElement('button');
      readBtn.setAttribute('id', 'toggle-read');
      readBtn.setAttribute('data-id', i);
  
      // If true, set content to "Read"
      if(library[i].isRead){
        readBtn.textContent = "Read";
        readBtn.classList.add('green-button');
      }else{
        readBtn.textContent = "Not Read";
        readBtn.classList.add('red-button');
      }
  
      readBtn.addEventListener('click', toggleRead);
  
      buttonGroup.appendChild(readBtn);
  
      let deleteBtn = document.createElement('button')
      deleteBtn.setAttribute('id', 'delete-btn');
      deleteBtn.textContent = "Delete";
  
      // Assign an Id on delete Button
      deleteBtn.setAttribute('data-id', i);
      buttonGroup.appendChild(deleteBtn);
  
      deleteBtn.addEventListener('click',deleteBook);
  
      bookCard.appendChild(buttonGroup);
      bookCatalog.appendChild(bookCard);
    }
  }
  const render = () =>{
    // Reset display
    bookCatalog.innerHTML = '';
    if(library.length === 0 ){
      let emptyMessage = document.createElement('h1');
      emptyMessage.textContent = "You have no books currently listed."
      emptyMessage.classList.add('empty-list-message');
      bookCatalog.appendChild(emptyMessage);
    }else{
      displayBooks();
    }
  }

  const addBookToLibrary = (book) =>{
    library.push(book);
    Form.resetForm();
    render();
  } 

  // Delete book function
  const deleteBook = (e) =>{
    let deleteBtnId = e.target.dataset.id;
    library.splice(deleteBtnId, 1);
    render();
  }


  // Toggle read state
  const toggleRead = (e) =>{
    let readBtnId = e.target.dataset.id;
    if(library[readBtnId].isRead == false){
      library[readBtnId].isRead = true;
      render();
    }else{
      library[readBtnId].isRead = false;
      render();
    }
  }

  return{render, addBookToLibrary}
}


const Form = (() =>{
  let books = Library(library);

  const validateForm = (book) =>{
    if(book.title === "" || book.author === "" || book.pages === ""){
      alert("All fields should not be left empty.");
      return false;
    }else{
      books.addBookToLibrary(book);
      Modal.modal.style.display = "none";
    }
  }

  const getFormValues = () =>{
    let elements = document.getElementById("book-form").elements;
    let title = elements.item(0);
    let author = elements.item(1);
    let pages = elements.item(2);
    let isRead = elements.item(3);
    let readState;
    if(isRead.checked){
        readState = true;
    }else{readState = false}
    
    let book = new Book(title.value, author.value, pages.value, readState);
    console.log(book.title);
    validateForm(book);
  }


  const resetForm = () =>{
    let form = document.getElementById("book-form");
    form.reset();
  }

  return{getFormValues, validateForm, resetForm};
})();

