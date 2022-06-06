import {Container} from 'inversify';
import {MongoBooksRepository, MongoUsersRepository} from './mongoDB';
import {AbstractBooksRepository, AbstractUsersRepository} from './abstract-services';


export const iocContainerBooks = new Container();
iocContainerBooks.bind(AbstractBooksRepository).to(MongoBooksRepository).inSingletonScope();

export const iocContainerUsers = new Container();
iocContainerUsers.bind(AbstractUsersRepository).to(MongoUsersRepository).inSingletonScope();
