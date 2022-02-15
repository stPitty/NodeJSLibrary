const uid = require('uniqid');


class Book {
  constructor(title, description, authors, favorite, fileCover, fileName, id=uid()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

module.exports = {
  Book: Book,
}


