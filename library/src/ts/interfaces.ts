declare module 'express-session' {
  export interface SessionData {
    returnTo?: string;
  }
}

export interface IUser extends Express.User {
  '_id'?: string,
  password?: string,
}

export interface IBook {
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileName: string,
}
