// Storage for book objects
let library = [];

let bookCatalog = document.querySelector('.book-catalog');
let readBtn = document.querySelector('#toggle-read');


// Modal button functionality
let modal = document.querySelector("#modal-cover");
let modalForm = document.querySelector("#modal");
let addButton = document.querySelector("#add-button");
let closeButton = document.querySelector(".close-button");

window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none";
  }
}

closeButton.addEventListener('click', (e) =>{
  resetForm();
  modal.style.display = "none";
})


addButton.addEventListener('click', (e) =>{
  modal.style.display = "flex";
})


// Constructor
function Book(title, author, pages, isRead){
  this.title = title,
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function(){
    let text = '';
    if(this.isRead){
      text = 'has been read.'
    }else{
      text = 'has not been read.';
    }
    return `${this.title} by ${this.author}, has ${this.pages} pages and ${text}`;
  }
}

// **For Testing Purposes**
// let book1 = new Book('Harry Potter', 'J.K Rowling', 1000, false);
// let book2 = new Book('The Hobbit', 'J.R.R Tolkien', 1000, false);
// addBookToLibrary(book1);
// addBookToLibrary(book2);


// functions
function render(){
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

function displayBooks(){
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

function deleteBook(e){
  let deleteBtnId = e.target.dataset.id;
  library.splice(deleteBtnId, 1);
  console.log(library);
  render();
}

function toggleRead(e){
  let readBtnId = e.target.dataset.id;
  if(library[readBtnId].isRead == false){
    library[readBtnId].isRead = true;
    render();
    console.log(library);
  }else{
    library[readBtnId].isRead = false;
    render();
    console.log(library);
  }
}

function getFormValues(){
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
  validateForm(book);

}

function resetForm(){
  let form = document.getElementById("book-form");
  form.reset();
}

function validateForm(book){
  if(book.title === "" || book.author === "" || book.pages === ""){
    alert("All fields should not be left empty.");
    return false;
  }else{
    addBookToLibrary(book);
    modal.style.display = "none";
  }
}


function addBookToLibrary(book){
  library.push(book);
  resetForm();
  render();
}

// Render data on start up
render()