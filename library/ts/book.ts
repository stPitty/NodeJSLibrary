interface IBook {
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string,
}

abstract class BooksRepository {
  abstract createBook(book: IBook): IBook {
    return;
  }

  abstract getBook(id: number): IBook {
    return;
  }

  abstract getBooks(): IBook[] {
    return;
  }

  abstract updateBook(id: number): IBook {
    return;
  }

  abstract deleteBook(id: number): IBook {
    return;
  }
}
