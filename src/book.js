export default class Book{
  constructor(title, author, pageCount, isRead){
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
  }

  getTitle(){
    return this.title;
  }

  getAuthor(){
    return this.author;
  }

  getPageCount(){
    return this.pageCount;
  }

  getIsRead(){
    return this.isRead;
  }

  // setTitle(title){
  //   this.title = title;
  // }

  // setAuthor(author){
  //   this.author = author
  // }

  // setPageCount(pageCount){
  //   this.pageCount = pageCount;
  // }

  // setIsRead(isRead){
  //   this.isRead = isRead};
}