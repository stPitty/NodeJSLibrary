const uid = require('uniqid');


class Book {
  constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id=uid()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}


function createData(qty, object) {
  object.books = [];
  let index = 0;
  while (index < qty) {
    let newBook = new Book(
      `This is book ${index}`,
      `Info about book ${index}`,
      `K.Mathers`,
      `Some info ${index}`,
      `${index}.file`,
      `name of ${index}`,
      `defaultPath`
    )
    object.books.push(newBook);
    index++
  }
}

const dataBase = {};
createData(4, dataBase);

module.exports = {
  dataBase: dataBase,
  Book: Book,
}


