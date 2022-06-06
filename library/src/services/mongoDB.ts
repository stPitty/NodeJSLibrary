import {AbstractBooksRepository, AbstractUsersRepository} from './abstract-services';
import Book from '../models/books';
import User from '../models/users';
import {CreateBookDto, GetUserDto, SaveUserDto} from '../ts/app-dto';
import {IBook, IUser} from '../ts/interfaces';
import {injectable} from 'inversify';


@injectable()
export class MongoBooksRepository extends AbstractBooksRepository {
  async createBook(book: CreateBookDto): Promise<IBook> | null {
    try {
      const newBook = new Book(book);
      await newBook.save();
      return newBook;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getBook(id: string): Promise<IBook> | null {
    try {
      return await Book.findById(id).select('-__v');
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getBooks(): Promise<IBook[]> | null {
    try {
      return await Book.find().select('-__v');
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async updateBook(id: string, bookData: CreateBookDto): Promise<IBook> | null {
    try {
      const book = await Book.findById(id).select('-__v');

      if (bookData.title) book.title = bookData.title;
      if (bookData.description) book.description = bookData.description;
      if (bookData.authors) book.authors = bookData.authors;
      if (bookData.favorite) book.favorite = bookData.favorite;
      if (bookData.fileCover) book.fileCover = bookData.fileCover;
      if (bookData.fileName) book.fileName = bookData.fileName;

      await book.save();
      return book;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async deleteBook(id: string): Promise<IBook> | null {
    try {
      const book = await Book.findById(id).select('-__v');
      await Book.deleteOne({_id: id});
      return book;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

@injectable()
export class MongoUsersRepository extends AbstractUsersRepository {
  async findOne(userData:GetUserDto): Promise<IUser> | null {
    try {
      return await User.findOne(userData);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findById(id: string): Promise<IUser> | null {
    try {
      return await User.findById(id);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async save(user:SaveUserDto): Promise<IUser> | null {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
