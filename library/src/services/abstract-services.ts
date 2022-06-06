import {CreateBookDto, GetUserDto, SaveUserDto} from '../ts/app-dto';
import {IBook, IUser} from '../ts/interfaces';
import {injectable} from 'inversify';


@injectable()
export abstract class AbstractBooksRepository {
  abstract createBook(book: CreateBookDto): Promise<IBook> | null;

  abstract getBook(id: string): Promise<IBook> | null;

  abstract getBooks(): Promise<IBook[]> | null;

  abstract updateBook(id: string, book: CreateBookDto): Promise<IBook> | null;

  abstract deleteBook(id: string): Promise<IBook> | null;
}

@injectable()
export abstract class AbstractUsersRepository {
  abstract findOne(user: GetUserDto): Promise<IUser> | null;

  abstract findById(id: string): Promise<IUser> | null;

  abstract save(user: SaveUserDto): Promise<IUser> | null;
}
