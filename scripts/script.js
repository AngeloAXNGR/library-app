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
// let book2 = new Book('The Hobbit', 'J.R.R Tolkie', 1000, false);
// addBookToLibrary(book1);
// addBookToLibrary(book2);


// functions
function render(){
  bookCatalog.innerHTML = '';
  displayBooks();
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

    let readBtn = document.createElement('button');
    readBtn.setAttribute('id', 'toggle-read');

    // If true, set content to "Read"
    if(library[i].isRead){
      readBtn.textContent = "Read";
    }else{
      readBtn.textContent = "Not Read";
    }

    bookCard.appendChild(readBtn);

    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', 'delete-btn');
    deleteBtn.textContent = "Delete";

    // Assign an Id on delete Button
    deleteBtn.setAttribute('data-id', i);
    bookCard.appendChild(deleteBtn);

    // For testing purposes to check if it can get the id;
    // deleteBtn.addEventListener('click', (e) => console.log(e.target.dataset.id));

    deleteBtn.addEventListener('click', (e)=>{
      let deleteBtnId = e.target.dataset.id;
      library.splice(deleteBtnId, 1);
      console.log(library);
      render();
    })

    bookCatalog.appendChild(bookCard);
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

